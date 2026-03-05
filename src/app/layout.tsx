import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kmux — Quest multiplexer for developers",
  description:
    "Every project is a quest. Kmux multiplexes them all. Port allocation, tmux orchestration, context switching — one command switches your entire world.",
  keywords: [
    "Kmux",
    "kmux",
    "quest multiplexer",
    "tmux",
    "developer tools",
    "CLI",
    "MCP",
    "AI development",
    "context switching",
    "port management",
    "project management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
