const https = require("https");
const { execSync } = require("child_process");

const songsToSearch = [
  { key: "3", title: "Kaanch Hi Baans Ke Bahangiya", search: "Kaanch Hi Baans Ke Bahangiya Anuradha Paudwal" },
  { key: "4", title: "Ho Dinanath", search: "Ho Dinanath Sharda Sinha" },
  { key: "5", title: "Pahile Pahil Chhathi Maiya", search: "Pahile Pahil Chhathi Maiya Sharda Sinha" },
  { key: "6", title: "Marbo Re Sugwa Dhanukh", search: "Marbo Re Sugwa Dhanukh Anuradha Paudwal" },
  { key: "7", title: "Bahangi Lachkat Jaye", search: "Bahangi Lachkat Jaye Kalpana Patowary" }
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

async function searchAndVerify() {
  console.log("=== Searching YouTube & Verifying 200 OK oEmbed IDs ===");
  const results = {};

  for (const song of songsToSearch) {
    console.log(`\nSearching for: ${song.title}...`);
    results[song.key] = null;
    try {
      // Get top 5 YouTube video IDs via yt_dlp search
      const cmd = `python3 -m yt_dlp --no-check-certificate --flat-playlist --print id "ytsearch5:${song.search}"`;
      const stdout = execSync(cmd).toString().trim();
      const candidateIds = stdout.split("\n").map((s) => s.trim()).filter(Boolean);

      console.log(`Found candidate IDs:`, candidateIds);

      for (const id of candidateIds) {
        const check = await checkOEmbed(id);
        if (check.status === 200) {
          console.log(`  ✅ FOUND 200 OK oEmbed ID: ${id} | Title: "${check.title}" | Author: "${check.author}"`);
          results[song.key] = { id, title: song.title, ytTitle: check.title, author: check.author };
          break; // Stop at first verified 200 OK embeddable ID
        } else {
          console.log(`  ❌ Rejected ${id} (Status: ${check.status})`);
        }
      }
    } catch (err) {
      console.error(`Search error for ${song.title}:`, err.message);
    }
  }

  console.log("\n=== FINAL VERIFIED 200 OK OEMBED RESULTS ===");
  console.log(JSON.stringify(results, null, 2));
}

searchAndVerify();
