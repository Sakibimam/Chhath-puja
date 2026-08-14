export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration: string;
  tag?: string;
}

export const CHHATH_SONGS: Song[] = [
  {
    id: "1",
    title: "केलवा के पात पर",
    artist: "Sharda Sinha",
    youtubeId: "3lsi7vXrX4g",
    duration: "7:05",
    tag: "कालजयी शारदा सिन्हा"
  },
  {
    id: "2",
    title: "उगा हो सूरज देव",
    artist: "Anuradha Paudwal",
    youtubeId: "jP_xLwVl58M",
    duration: "6:14",
    tag: "संध्या अर्घ्य"
  },
  {
    id: "3",
    title: "काँच ही बाँस के बहँगिया",
    artist: "Anuradha Paudwal",
    youtubeId: "OnoINkPrhK0",
    duration: "5:42",
    tag: "लोकप्रिय गीत"
  },
  {
    id: "4",
    title: "हो दीनानाथ",
    artist: "Sharda Sinha",
    youtubeId: "f-WsraDBPnY",
    duration: "8:12",
    tag: "भक्ति प्रवाह"
  },
  {
    id: "5",
    title: "पहिल पहिल छठी मईया",
    artist: "Sharda Sinha",
    youtubeId: "DG8F-csoRAQ",
    duration: "6:30",
    tag: "भावुक संस्मरण"
  },
  {
    id: "6",
    title: "मारबो रे सुगवा धनुष से",
    artist: "Anuradha Paudwal",
    youtubeId: "6rmBHUl8veg",
    duration: "5:20",
    tag: "पारंपरिक"
  },
  {
    id: "7",
    title: "बहंगी लचकत जाये",
    artist: "Kalpana Patowary / Traditional",
    youtubeId: "Vc8wNTgKG1k",
    duration: "6:02",
    tag: "मधुर संगीत"
  },
  {
    id: "8",
    title: "छठी माई के घाटवा पे",
    artist: "Pawan Singh",
    youtubeId: "6diXoexNQ58",
    duration: "5:15",
    tag: "भोजपुरी महापर्व"
  },
  {
    id: "9",
    title: "पटना के घाट पर",
    artist: "Sharda Sinha",
    youtubeId: "_RDu847nhmU",
    duration: "6:45",
    tag: "गंगा घाट अर्घ्य"
  },
  {
    id: "10",
    title: "आठ ही बाँस के बहँगिया",
    artist: "Traditional / Devi",
    youtubeId: "6W1cPX67YzI",
    duration: "5:50",
    tag: "पारंपरिक लोकगीत"
  },
  {
    id: "11",
    title: "अरघ के बेर भइले",
    artist: "Anuradha Paudwal",
    youtubeId: "fqlh99htTJA",
    duration: "6:20",
    tag: "उषा अर्घ्य"
  },
  {
    id: "12",
    title: "दुखवा मिटाईं छठी मईया",
    artist: "Sharda Sinha",
    youtubeId: "NkDiSj9c1EA",
    duration: "7:10",
    tag: "नवीन पावन भजन"
  }
];

export const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/37i9dQZF1DX8AYACgIFhwm";
export const YT_MUSIC_PLAYLIST_URL = "https://music.youtube.com/playlist?list=OLAK5uy_leA2sPh93ySpemsFmPJUcjL2JXAkuTr-g";
