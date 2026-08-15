import type { Metadata } from "next";
import { Rozha_One, Outfit } from "next/font/google";
import "./globals.css";

const rozha = Rozha_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-rozha",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// Construct base URL for Vercel CDN or local development
const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "छठ पूजा | Chhathi Maiya Ke Geet — Ghat Par Khade Hokar Suno",
  description: "Immersive nostalgic Chhath Puja experience with 12 classic folk songs by Anuradha Paudwal, Sharda Sinha & Pawan Singh. Feel the devotion, river ghat mist, floating diyas and rising sun.",
  keywords: [
    "Chhath Puja",
    "Chhathi Maiya",
    "Sharda Sinha Chhath Geet",
    "Anuradha Paudwal Chhath Songs",
    "Pawan Singh Chhath Geet",
    "Uga Hai Suraj Dev",
    "Kelwa Ke Paat Par",
    "Bihar Festival",
    "Chhath Diaspora"
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "छठ पूजा | Chhathi Maiya Ke Geet",
    description: "Immersive Bihar Chhath Ghat experience with golden sun, floating diyas and classic Chhath geet.",
    url: baseUrl,
    siteName: "छठ पूजा गीत",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "छठ पूजा - छठी मईया के गीत",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "छठ पूजा | Chhathi Maiya Ke Geet",
    description: "Immersive Bihar Chhath Ghat experience with golden sun, floating diyas and classic Chhath geet.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${rozha.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
        {children}
      </body>
    </html>
  );
}
