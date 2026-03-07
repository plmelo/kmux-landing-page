"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
});

export default function LazyMusicPlayer() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Load music player ~1s after hero animations land
    const timer = setTimeout(() => setShouldLoad(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return <MusicPlayer />;
}
