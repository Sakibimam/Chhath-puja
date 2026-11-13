// Live "people on the site right now" counter.
//
// Each open tab sends a heartbeat every ~20s with a random per-tab id. We keep
// the ids in a Redis sorted set scored by last-seen time, drop anything older
// than STALE_MS, and return how many are left. Serverless instances share no
// memory, so production needs Redis (Upstash, e.g. via the Vercel Marketplace).
// Without Redis env vars, dev falls back to in-memory and prod reports null
// (the badge then hides itself).

const KEY = "presence:listeners";
const STALE_MS = 45_000;
const ID_PATTERN = /^[a-zA-Z0-9-]{8,64}$/;

const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisPipeline(commands: (string | number)[][]): Promise<unknown[]> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis responded ${res.status}`);
  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map((d) => {
    if (d.error) throw new Error(d.error);
    return d.result;
  });
}

// Dev-only fallback so the badge can be seen locally without Redis.
const memory = new Map<string, number>();

async function touch(id: string, leaving: boolean): Promise<number | null> {
  const now = Date.now();
  const cutoff = now - STALE_MS;

  if (REDIS_URL && REDIS_TOKEN) {
    const results = await redisPipeline([
      leaving ? ["ZREM", KEY, id] : ["ZADD", KEY, now, id],
      ["ZREMRANGEBYSCORE", KEY, 0, cutoff],
      ["ZCARD", KEY],
      ["PEXPIRE", KEY, STALE_MS * 4],
    ]);
    return Number(results[2]) || 0;
  }

  if (process.env.NODE_ENV === "production") return null;

  if (leaving) memory.delete(id);
  else memory.set(id, now);
  for (const [key, seen] of memory) if (seen < cutoff) memory.delete(key);
  return memory.size;
}

export async function POST(request: Request) {
  let body: { id?: unknown; leave?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!ID_PATTERN.test(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const count = await touch(id, body.leave === true);
    return Response.json({ count }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[presence]", err);
    return Response.json({ count: null }, { status: 503 });
  }
}
