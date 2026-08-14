const https = require("https");
const { execSync } = require("child_process");

const newSongsToSearch = [
  { key: "8", title: "Chhathi Maiya Ke Ghatwa Pe", search: "Chhathi Maiya Ke Ghatwa Pe Sharda Sinha" },
  { key: "9", title: "Patna Ke Ghat Par", search: "Patna Ke Ghat Par Sharda Sinha" },
  { key: "10", title: "Aath Hi Baans Ke Bahangiya", search: "Aath Hi Baans Ke Bahangiya Devi" },
  { key: "11", title: "Arghya Ke Ber", search: "Suruj Dev Arghya Ke Ber Anuradha Paudwal" },
  { key: "12", title: "Chhath Ghata Se Loutab", search: "Chhath Ghata Se Loutab Sharda Sinha" }
];

function checkOEmbed(id) {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            resolve({ id, status: 200, title: parsed.title, author: parsed.author_name });
          } catch (e) {
            resolve({ id, status: res.statusCode });
          }
        } else {
          resolve({ id, status: res.statusCode });
        }
      });
    }).on("error", () => resolve({ id, status: 500 }));
  });
}

async function searchAndVerifyNew() {
  console.log("=== Searching YouTube & Verifying 200 OK oEmbed for NEW Chhath Songs ===");
  const results = {};

  for (const song of newSongsToSearch) {
    console.log(`\nSearching for: ${song.title}...`);
    results[song.key] = null;
    try {
      const cmd = `python3 -m yt_dlp --no-check-certificate --flat-playlist --print id "ytsearch5:${song.search}"`;
      const stdout = execSync(cmd).toString().trim();
      const candidateIds = stdout.split("\n").map((s) => s.trim()).filter(Boolean);

      console.log(`Candidate IDs:`, candidateIds);

      for (const id of candidateIds) {
        const check = await checkOEmbed(id);
        if (check.status === 200) {
          console.log(`  ✅ 200 OK oEmbed ID: ${id} | Title: "${check.title}" | Author: "${check.author}"`);
          results[song.key] = { id, title: song.title, ytTitle: check.title, author: check.author };
          break;
        } else {
          console.log(`  ❌ Rejected ${id} (Status: ${check.status})`);
        }
      }
    } catch (err) {
      console.error(`Search error for ${song.title}:`, err.message);
    }
  }

  console.log("\n=== NEW VERIFIED 200 OK OEMBED SONGS ===");
  console.log(JSON.stringify(results, null, 2));
}

searchAndVerifyNew();
