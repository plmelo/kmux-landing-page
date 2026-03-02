"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const tracks = [
  { src: "/api/audio?id=retro1", title: "Midnight Run 80's", artist: "lofidreams", pixabayId: 400847 },
  { src: "/api/audio?id=retro2", title: "Midnight Run 90's", artist: "lofidreams", pixabayId: 344050 },
  { src: "/api/audio?id=retro3", title: "Neon Dreams 90's", artist: "lofidreams", pixabayId: 344049 },
  { src: "/api/audio?id=retro4", title: "Miami Synth Rush", artist: "ronaldoreyz", pixabayId: 464903 },
];

const STORAGE_KEY = "qmux-music-player";
const AUTO_COLLAPSE_MS = 5000;

function loadPrefs(): { isMuted: boolean; currentTrack: number } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        isMuted: Boolean(parsed.isMuted),
        currentTrack: typeof parsed.currentTrack === "number" ? parsed.currentTrack % tracks.length : 0,
      };
    }
  } catch { /* quota / privacy */ }
  return { isMuted: false, currentTrack: 0 };
}

function savePrefs(isMuted: boolean, currentTrack: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ isMuted, currentTrack }));
  } catch { /* quota / privacy */ }
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage + create Audio element
  useEffect(() => {
    const prefs = loadPrefs();
    setIsMuted(prefs.isMuted);
    setCurrentTrack(prefs.currentTrack);
    setIsHydrated(true);

    const audio = new Audio(tracks[prefs.currentTrack].src);
    audio.volume = 0.3;
    audio.preload = "none";
    audio.muted = prefs.isMuted;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      // Advance to next track, loop playlist
      setCurrentTrack((prev) => {
        const next = (prev + 1) % tracks.length;
        return next;
      });
      wasPlayingRef.current = true;
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // When currentTrack changes, update source and resume if needed
  useEffect(() => {
    if (!isHydrated || !audioRef.current) return;
    const audio = audioRef.current;
    const shouldPlay = wasPlayingRef.current;

    audio.src = tracks[currentTrack].src;
    audio.load();

    if (shouldPlay) {
      audio.play().catch(() => { /* autoplay blocked */ });
    }

    savePrefs(isMuted, currentTrack);
  }, [currentTrack, isHydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync mute state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
    if (isHydrated) savePrefs(isMuted, currentTrack);
  }, [isMuted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-collapse timer
  const resetCollapseTimer = useCallback(() => {
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    collapseTimerRef.current = setTimeout(() => {
      if (wasPlayingRef.current || audioRef.current?.paused === false) {
        setIsExpanded(false);
      }
    }, AUTO_COLLAPSE_MS);
  }, []);

  const cancelCollapseTimer = useCallback(() => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      wasPlayingRef.current = true;
      audio.play().catch(() => { /* autoplay blocked */ });
    } else {
      wasPlayingRef.current = false;
      audio.pause();
    }
    resetCollapseTimer();
  }, [resetCollapseTimer]);

  const skipTrack = useCallback(() => {
    wasPlayingRef.current = isPlaying;
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    resetCollapseTimer();
  }, [isPlaying, resetCollapseTimer]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    resetCollapseTimer();
  }, [resetCollapseTimer]);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev;
      if (next) {
        resetCollapseTimer();
      } else {
        cancelCollapseTimer();
      }
      return next;
    });
  }, [resetCollapseTimer, cancelCollapseTimer]);

  // Collapsed play button: start playback + expand in one tap
  const handleCollapsedPlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      wasPlayingRef.current = true;
      audio.play().catch(() => { /* autoplay blocked */ });
    }
    setIsExpanded(true);
    resetCollapseTimer();
  }, [resetCollapseTimer]);

  if (!isHydrated) return null;

  const eqAnimations = [
    "eq-bounce-1 0.45s ease-in-out infinite",
    "eq-bounce-2 0.55s ease-in-out infinite 0.1s",
    "eq-bounce-3 0.5s ease-in-out infinite 0.05s",
    "eq-bounce-1 0.6s ease-in-out infinite 0.15s",
    "eq-bounce-2 0.4s ease-in-out infinite 0.08s",
  ];

  const idleHeights = [0.35, 0.55, 0.45, 0.6, 0.3];

  const renderEqBars = (clickable: boolean) => (
    <div className={`flex items-end gap-[3px] h-5${clickable ? " cursor-pointer" : ""}`} onClick={clickable ? toggleExpand : undefined} aria-hidden="true">
      {eqAnimations.map((anim, i) => (
        <span
          key={i}
          className="eq-bar"
          style={{
            height: "20px",
            animation: isPlaying ? anim : "none",
            transform: isPlaying ? undefined : `scaleY(${idleHeights[i]})`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div
      role="region"
      aria-label="Music player"
      className="fixed bottom-5 right-5 z-40"
      onMouseEnter={cancelCollapseTimer}
      onMouseLeave={() => { if (isExpanded) resetCollapseTimer(); }}
    >
      <div
        className={`music-player-panel rounded-full transition-all duration-300 ease-out ${
          isExpanded ? "rounded-xl px-4 py-3" : "px-3.5 py-2.5"
        }`}
        style={{ width: isExpanded ? 240 : undefined }}
      >
        {isExpanded ? (
          <div className="flex flex-col gap-2">
            {/* Top row: EQ + track info */}
            <div className="flex items-center gap-3">
              {renderEqBars(true)}
              <div aria-live="polite" className="flex flex-col truncate flex-1 min-w-0">
                <a
                  href={`https://pixabay.com/music/id-${tracks[currentTrack].pixabayId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-white/60 hover:text-neon-cyan truncate transition-colors"
                >
                  {tracks[currentTrack].title}
                </a>
                <span className="text-[9px] font-mono text-white/30 truncate">
                  by {tracks[currentTrack].artist}
                </span>
              </div>
            </div>

            {/* Bottom row: controls */}
            <div className="flex items-center justify-center gap-3">
              {/* Play / Pause */}
              <button
                className="music-player-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="3" y="2" width="3.5" height="12" rx="1" />
                    <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4 2.5v11l9-5.5z" />
                  </svg>
                )}
              </button>

              {/* Skip */}
              <button
                className="music-player-btn"
                onClick={skipTrack}
                aria-label="Next track"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 2.5v11l7-5.5z" />
                  <rect x="11" y="2.5" width="2.5" height="11" rx="0.5" />
                </svg>
              </button>

              {/* Mute / Unmute */}
              <button
                className="music-player-btn"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 5.5h2.5L8 2.5v11l-3.5-3H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z" />
                    <path d="M11 5.5l4 5m0-5l-4 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 5.5h2.5L8 2.5v11l-3.5-3H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z" />
                    <path d="M11 4.5a4 4 0 010 7" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                    <path d="M12.5 2.5a7 7 0 010 11" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ) : (
          // Collapsed: play/pause button + EQ bars
          <div className="flex items-center gap-2 cursor-pointer" onClick={isPlaying ? toggleExpand : handleCollapsedPlay}>
            <span className="music-player-btn shrink-0" aria-label={isPlaying ? "Now playing" : "Play music"}>
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="2" width="3.5" height="12" rx="1" />
                  <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              )}
            </span>
            {renderEqBars(false)}
          </div>
        )}
      </div>
    </div>
  );
}
