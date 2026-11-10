export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration: string;
  tag?: string;
}

// Source: YouTube playlist "Top Chhath Puja Hits"
// https://www.youtube.com/playlist?list=PLBAFBBAjui5Q
// The app plays ONLY these tracks, in playlist order.
export const YT_PLAYLIST_ID = "PLBAFBBAjui5Q";
export const YT_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${YT_PLAYLIST_ID}`;

export const CHHATH_SONGS: Song[] = [
  { id: "1", title: "Kelwa Ke Paat Par", artist: "Sharda Sinha", youtubeId: "qUeuWi81PmM", duration: "8:37" },
  { id: "2", title: "Dukhwa Mitayin Chhathi Maiya", artist: "Sharda Sinha", youtubeId: "_7NbR6nvxQI", duration: "5:26" },
  { id: "3", title: "Kaanch Hi Baans Ke Bahgiya", artist: "Traditional", youtubeId: "D0_nhnfINzc", duration: "6:53" },
  { id: "4", title: "Ugho Suraj Dev Arag Bair", artist: "Sharda Sinha", youtubeId: "bQKGCpRBlLs", duration: "2:57" },
  { id: "5", title: "Patna Ke Ghat Pe", artist: "Khesari Lal Yadav", youtubeId: "U9g7pJVumdg", duration: "3:17" },
  { id: "6", title: "Aara Chapra Ke Ghat Nik Lagela", artist: "Khesari Lal Yadav", youtubeId: "8LfKS-obCcg", duration: "3:29" },
  { id: "7", title: "Li Aai Dinhi Unkh", artist: "Khesari Lal Yadav", youtubeId: "Nn1V16dgdkU", duration: "4:51" },
  { id: "8", title: "Chhathi Maiya", artist: "Khesari Lal Yadav", youtubeId: "z1k6wC0fjm0", duration: "3:31" },
  { id: "9", title: "Piya Chhath Kare Jaaibi Naihar Mein", artist: "Khesari Lal Yadav", youtubeId: "DcgtyEzZiOU", duration: "4:46" },
  { id: "10", title: "Kerawa Ke Patawa Pa Newta Pethawani", artist: "Pawan Singh", youtubeId: "HalHmElNzz8", duration: "4:28" },
  { id: "11", title: "Mathwa Pa Bandh Chunriya", artist: "Pawan Singh", youtubeId: "Fqn_80iWQWk", duration: "3:26" },
  { id: "12", title: "Chhathi Mayi Ke Pawaan", artist: "Pawan Singh", youtubeId: "ahU05tHAwwM", duration: "7:22" },
  { id: "13", title: "Pahile Pahil Chhathi Maiya", artist: "Sharda Sinha", youtubeId: "yjG1aAgEZF8", duration: "4:51" },
  { id: "14", title: "Hey Chhathi Maiya Suna Suna Laage", artist: "Khesari Lal Yadav", youtubeId: "_PK0uLTHo1s", duration: "4:20" },
  { id: "15", title: "Uthau Suruj Bhaile Bihaan", artist: "Sharda Sinha", youtubeId: "sdHZn1BFhHY", duration: "5:28" },
  { id: "16", title: "Bhaiya Rangle Naya Saari", artist: "Pawan Singh", youtubeId: "uCLaTDX7tgA", duration: "3:37" },
  { id: "17", title: "Chhath Ghate Chali", artist: "Khesari Lal Yadav", youtubeId: "RECXFdRjQ9M", duration: "4:29" },
  { id: "18", title: "Sooruj Dev", artist: "Sharda Sinha", youtubeId: "mgPG-71STEM", duration: "7:24" },
  { id: "19", title: "Chhathi Maiya Hoyiha Sahay", artist: "Pawan Singh", youtubeId: "m76W1RcKPzo", duration: "4:18" },
  { id: "20", title: "Maiya Ke Mahima Bhari", artist: "Priyanka Singh", youtubeId: "1QKlbKMYdyU", duration: "3:55" },
  { id: "21", title: "Jai Chati Maiya", artist: "Sharda Sinha", youtubeId: "YC17AMwqK0c", duration: "6:33" },
  { id: "22", title: "Jal Beech Khada Hoee (Jode Jode Phalwa)", artist: "Pawan Singh", youtubeId: "mFqvZp8FLhg", duration: "5:28" },
  { id: "23", title: "Aragh Ke Bera", artist: "Khesari Lal Yadav", youtubeId: "l-edcniAuGE", duration: "3:41" },
  { id: "24", title: "Aurora", artist: "Amritanshu Dutta", youtubeId: "BjqDIY8Wjxs", duration: "1:12" },
  { id: "25", title: "Darshan Dekhai Dihi", artist: "Kalpana Patowary", youtubeId: "up3_Bx7RvnM", duration: "4:51" },
];

export const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/37i9dQZF1DX8AYACgIFhwm";
export const YT_MUSIC_PLAYLIST_URL = `https://music.youtube.com/playlist?list=${YT_PLAYLIST_ID}`;
