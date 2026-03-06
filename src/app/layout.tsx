import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LazyMusicPlayer from "@/components/LazyMusicPlayer";

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
  title: "Kmux — Work multiplexer for developers",
  description:
    "One control plane for every project and every agent. Port allocation, tmux orchestration, context switching — one command switches your entire world.",
  keywords: [
    "Kmux",
    "kmux",
    "work multiplexer",
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
        <LazyMusicPlayer />
      </body>
    </html>
  );
}
