const https = require("https");

const candidates = {
  "1": { title: "Kelwa Ke Paat Par - Sharda Sinha", ids: ["3lsi7vXrX4g", "3mE1S4dsh8s", "R39E4v0R8y4"] },
  "2": { title: "Uga Ho Suruj Dev - Anuradha Paudwal", ids: ["jP_xLwVl58M", "vB4sC-o20Q0", "dpxmH6X_ZzU"] },
  "3": { title: "Kaanch Hi Baans Ke Bahangiya - Anuradha Paudwal", ids: ["8DqJ-Xk4H0A", "J8J90U9dEaY", "W3b2y2wU0xQ"] },
  "4": { title: "Ho Dinanath - Sharda Sinha", ids: ["Bf-X8W0P4-w", "T76l5GkEw_Q", "W7tH-d8Xb9s"] },
  "5": { title: "Pahile Pahil Chhathi Maiya - Sharda Sinha", ids: ["p57zU1Wq-M8", "Y0Q8nKzS1_A", "9k1n-w89X8k"] },
  "6": { title: "Marbo Re Sugwa Dhanukh - Anuradha Paudwal", ids: ["H-5u7WkUqXg", "5-Qv2N7W4-o", "E4g0w3zX4y0"] },
  "7": { title: "Bahangi Lachkat Jaye - Kalpana Patowary", ids: ["W98pE-0-798", "u-8W9X4v_1k", "u8W9X4v1k"] }
};

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
            resolve({ id, status: res.statusCode, error: "Invalid JSON" });
          }
        } else {
          resolve({ id, status: res.statusCode, error: `HTTP ${res.statusCode}` });
        }
      });
    }).on("error", (err) => {
      resolve({ id, status: 500, error: err.message });
    });
  });
}

async function verifyAll() {
  console.log("=== Verifying YouTube Video IDs against oEmbed Endpoint ===");
  const verifiedResults = {};

  for (const [key, item] of Object.entries(candidates)) {
    console.log(`\nChecking Song ${key}: ${item.title}`);
    verifiedResults[key] = [];
    for (const id of item.ids) {
      const res = await checkOEmbed(id);
      if (res.status === 200) {
        console.log(`  ✅ [200 OK] ID: ${id} | Title: "${res.title}" | Author: "${res.author}"`);
        verifiedResults[key].push(res);
      } else {
        console.log(`  ❌ [${res.status} ${res.error}] ID: ${id}`);
      }
    }
  }

  console.log("\n=== Verified Best Embeddable Songs Summary ===");
  console.log(JSON.stringify(verifiedResults, null, 2));
}

verifyAll();
