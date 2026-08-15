# 🌅 छठ पूजा (Chhath Puja Geet) — A Nostalgic Audio-Visual Experience

> *“दूर देश में बैठे बिहारियों के लिए… घर की याद”*

A single-page web experience built for Biharis living abroad (USA, UK, Canada, and across the diaspora) who miss the sacred morning ghats, the fragrance of *Thekua*, and the timeless folk melodies of **Sharda Sinha** and **Anuradha Paudwal** during Chhath Puja.

---

## ✨ Features

- **🎨 Flat Vector Editorial Artwork**: Designed in a modern paper-cut vector illustration style (inspired by New Yorker covers & editorial art) with warm terracotta tones, a glowing sun horizon, and generous negative sky space.
- **🎵 12 Programmatically Verified Chhath Classics**: Hardcoded tracklist featuring iconic songs by Sharda Sinha, Anuradha Paudwal, Kalpana Patowary, and Pawan Singh. Every video ID is programmatically verified against YouTube's official `oEmbed` API to guarantee **HTTP 200 OK** embeddability.
- **📻 Official Spotify Embed Widget**: Includes a dedicated playlist drawer featuring Spotify's sanctioned 50-track *"Chhath Puja Geet"* playlist (21.9K+ saves) as a secondary listening option.
- **🪔 Interactive Floating River Diyas**: Click or tap anywhere on the Ganges river water to float a glowing diya downstream accompanied by golden spark confetti bursts.
- **📱 100% Mobile Responsive Glassmorphic Player**: Ultra-minimalist bottom player capsule with real-time time progress polling (250ms), seek control, and touch-optimized controls for mobile devices.

---

## 🎶 Playlist Tracklist (12 Verified Classics)

1. **केलवा के पात पर** — *Sharda Sinha*
2. **उगा हो सूरज देव** — *Anuradha Paudwal*
3. **काँच ही बाँस के बहँगिया** — *Anuradha Paudwal*
4. **हो दीनानाथ** — *Sharda Sinha*
5. **पहिल पहिल छठी मईया** — *Sharda Sinha*
6. **मारबो रे सुगवा धनुष से** — *Anuradha Paudwal*
7. **बहंगी लचकत जाये** — *Kalpana Patowary*
8. **छठी माई के घाटवा पे** — *Pawan Singh*
9. **पटना के घाट पर** — *Sharda Sinha*
10. **आठ ही बाँस के बहँगिया** — *Traditional / Devi*
11. **अरघ के बेर भइले** — *Anuradha Paudwal*
12. **दुखवा मिटाईं छठी मईया** — *Sharda Sinha*

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 App Router](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Audio Control**: [`react-youtube`](https://github.com/tjallingt/react-youtube) (Official YouTube IFrame Player API)
- **Effects**: `canvas-confetti` & `lucide-react`

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Sakibimam/Chhath-puja.git
cd Chhath-puja
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the site.

### 4. Build for production
```bash
npm run build
```

---

## 📡 Programmatic YouTube ID Verification

To check or add new song IDs against YouTube's oEmbed endpoint without hallucinating video IDs:
```bash
node scripts/verify-youtube-ids.js
```

---

## 📄 License

Created with devotion for the Bihari diaspora worldwide. 🙏
