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

export const metadata: Metadata = {
  title: "छठ पूजा | Chhathi Maiya Ke Geet — Ghat Par Khade Hokar Suno",
  description: "Immersive nostalgic Chhath Puja experience with 10 classic songs by Anuradha Paudwal & Sharda Sinha. Feel the devotion, river ghat mist, floating diyas and rising sun.",
  keywords: ["Chhath Puja", "Chhathi Maiya", "Sharda Sinha Chhath Geet", "Anuradha Paudwal Chhath Songs", "Uga Hai Suraj Dev", "Kelwa Ke Paat Par", "Bihar Festival"],
  openGraph: {
    title: "छठ पूजा | Chhathi Maiya Ke Geet",
    description: "Immersive Bihar Chhath Ghat experience with golden sun, floating diyas and classic Chhath geet.",
    type: "website",
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
