"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const tracks = [
  { src: "/api/audio?id=retro0", title: "80s Energy", artist: "playsound", pixabayId: 176577 },
  { src: "/api/audio?id=retro1", title: "Midnight Run 80's", artist: "lofidreams", pixabayId: 400847 },
  { src: "/api/audio?id=retro2", title: "Midnight Run 90's", artist: "lofidreams", pixabayId: 344050 },
  { src: "/api/audio?id=retro3", title: "Neon Dreams 90's", artist: "lofidreams", pixabayId: 344049 },
  { src: "/api/audio?id=retro4", title: "Miami Synth Rush", artist: "ronaldoreyz", pixabayId: 464903 },
  { src: "/api/audio?id=retro5", title: "Neon Shadows", artist: "lofidreams", pixabayId: 384111 },
  { src: "/api/audio?id=retro6", title: "Synthwave 80s Robot Swarm", artist: "nickpanekaiassets", pixabayId: 218092 },
  { src: "/api/audio?id=retro7", title: "Neon Reverie", artist: "niknet_art", pixabayId: 418321 },
];

const STORAGE_KEY = "kmux-music-player";
const AUTO_COLLAPSE_MS = 5000;
const CROSSFADE_MS = 2000;
const TARGET_VOLUME = 0.3;
const FADE_STEP_MS = 50;

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
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Dual audio elements for crossfading
  const audioARef = useRef<HTMLAudioElement | null>(null);
  const audioBRef = useRef<HTMLAudioElement | null>(null);
  const activeSlotRef = useRef<"a" | "b">("a");

  const wasPlayingRef = useRef(false);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const crossfadingRef = useRef(false);

  // Refs for current values (avoid stale closures in event handlers)
  const isMutedRef = useRef(false);
  const currentTrackRef = useRef(0);

  // Expose crossfade function via ref so callbacks can call it
  const crossfadeFnRef = useRef<(nextIndex: number) => void>(() => {});

  // Keep refs in sync with state
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { currentTrackRef.current = currentTrack; }, [currentTrack]);

  // Hydrate + create dual audio elements
  useEffect(() => {
    const hasExistingPrefs = (() => {
      try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; }
    })();
    const prefs = loadPrefs();
    setIsMuted(prefs.isMuted);
    setCurrentTrack(prefs.currentTrack);
    isMutedRef.current = prefs.isMuted;
    currentTrackRef.current = prefs.currentTrack;
    setIsHydrated(true);

    // First-time visitors: delay appearance, then auto-expand with glow
    if (!hasExistingPrefs) {
      setIsHydrated(false);
      setTimeout(() => {
        setIsFirstVisit(true);
        setIsExpanded(true);
        setIsHydrated(true);
      }, 2000);
    }

    const audioA = new Audio(tracks[prefs.currentTrack].src);
    audioA.volume = TARGET_VOLUME;
    audioA.preload = "none";
    audioA.muted = prefs.isMuted;
    audioARef.current = audioA;

    const audioB = new Audio();
    audioB.volume = 0;
    audioB.preload = "none";
    audioB.muted = prefs.isMuted;
    audioBRef.current = audioB;

    activeSlotRef.current = "a";

    const getActive = () => activeSlotRef.current === "a" ? audioA : audioB;
    const getInactive = () => activeSlotRef.current === "a" ? audioB : audioA;

    // Crossfade to a new track
    const crossfadeTo = (nextIndex: number) => {
      // If mid-crossfade, finish it instantly before starting a new one
      if (crossfadingRef.current) {
        if (fadeTimerRef.current) {
          clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = null;
        }
        const outgoing = getActive();
        const incoming = getInactive();
        outgoing.pause();
        outgoing.currentTime = 0;
        incoming.volume = TARGET_VOLUME;
        activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";
        crossfadingRef.current = false;
      }

      const outgoing = getActive();
      const incoming = getInactive();
      const wasPlaying = !outgoing.paused;

      incoming.src = tracks[nextIndex].src;
      incoming.muted = isMutedRef.current;
      incoming.load();

      if (!wasPlaying) {
        outgoing.pause();
        outgoing.currentTime = 0;
        incoming.volume = TARGET_VOLUME;
        activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";
        return;
      }

      // Perform crossfade
      crossfadingRef.current = true;
      incoming.volume = 0;
      incoming.play().catch(() => { /* autoplay blocked */ });

      const totalSteps = CROSSFADE_MS / FADE_STEP_MS;
      let step = 0;
      const startVol = outgoing.volume;

      fadeTimerRef.current = setInterval(() => {
        step++;
        const progress = Math.min(step / totalSteps, 1);
        outgoing.volume = Math.max(0, startVol * (1 - progress));
        incoming.volume = TARGET_VOLUME * progress;

        if (progress >= 1) {
          if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = null;
          crossfadingRef.current = false;
          outgoing.pause();
          outgoing.currentTime = 0;
          incoming.volume = TARGET_VOLUME;
          activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";
        }
      }, FADE_STEP_MS);
    };

    crossfadeFnRef.current = crossfadeTo;

    // Track play/pause state from whichever audio is active
    const onPlayPause = () => {
      const active = getActive();
      setIsPlaying(!active.paused);
    };

    // Near-end detection: start crossfade before track ends
    const onTimeUpdate = (e: Event) => {
      const audio = e.target as HTMLAudioElement;
      if (audio !== getActive()) return;
      if (crossfadingRef.current) return;
      if (!audio.duration || !isFinite(audio.duration)) return;

      const remaining = audio.duration - audio.currentTime;
      if (remaining <= CROSSFADE_MS / 1000 && audio.currentTime > 0.5) {
        const next = (currentTrackRef.current + 1) % tracks.length;
        currentTrackRef.current = next;
        setCurrentTrack(next);
        savePrefs(isMutedRef.current, next);
        crossfadeTo(next);
      }
    };

    // Fallback: if track ends without crossfade (e.g. duration unknown)
    const onEnded = (e: Event) => {
      const audio = e.target as HTMLAudioElement;
      if (audio !== getActive()) return;
      if (crossfadingRef.current) return;

      const next = (currentTrackRef.current + 1) % tracks.length;
      currentTrackRef.current = next;
      setCurrentTrack(next);
      savePrefs(isMutedRef.current, next);

      const incoming = getInactive();
      incoming.src = tracks[next].src;
      incoming.muted = isMutedRef.current;
      incoming.volume = TARGET_VOLUME;
      incoming.load();
      incoming.play().catch(() => { /* autoplay blocked */ });
      activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";
    };

    for (const audio of [audioA, audioB]) {
      audio.addEventListener("play", onPlayPause);
      audio.addEventListener("pause", onPlayPause);
      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("ended", onEnded);
    }

    return () => {
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      for (const audio of [audioA, audioB]) {
        audio.removeEventListener("play", onPlayPause);
        audio.removeEventListener("pause", onPlayPause);
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("ended", onEnded);
        audio.pause();
        audio.src = "";
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync mute state to both audio elements
  useEffect(() => {
    if (audioARef.current) audioARef.current.muted = isMuted;
    if (audioBRef.current) audioBRef.current.muted = isMuted;
    if (isHydrated) savePrefs(isMuted, currentTrackRef.current);
  }, [isMuted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-collapse timer
  const resetCollapseTimer = useCallback(() => {
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    collapseTimerRef.current = setTimeout(() => {
      const active = activeSlotRef.current === "a" ? audioARef.current : audioBRef.current;
      if (wasPlayingRef.current || (active && !active.paused)) {
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
    // If mid-crossfade, cancel it and pause on the incoming track
    if (crossfadingRef.current) {
      if (fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
      crossfadingRef.current = false;
      const outgoing = activeSlotRef.current === "a" ? audioARef.current : audioBRef.current;
      const incoming = activeSlotRef.current === "a" ? audioBRef.current : audioARef.current;
      if (outgoing) { outgoing.pause(); outgoing.currentTime = 0; }
      if (incoming) { incoming.volume = TARGET_VOLUME; incoming.pause(); }
      activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";
      wasPlayingRef.current = false;
      resetCollapseTimer();
      return;
    }

    const active = activeSlotRef.current === "a" ? audioARef.current : audioBRef.current;
    if (!active) return;

    if (active.paused) {
      wasPlayingRef.current = true;
      active.play().catch(() => { /* autoplay blocked */ });
    } else {
      wasPlayingRef.current = false;
      active.pause();
    }
    resetCollapseTimer();
  }, [resetCollapseTimer]);

  const skipTrack = useCallback(() => {
    wasPlayingRef.current = isPlaying;
    const next = (currentTrackRef.current + 1) % tracks.length;
    currentTrackRef.current = next;
    setCurrentTrack(next);
    savePrefs(isMutedRef.current, next);
    crossfadeFnRef.current(next);
    resetCollapseTimer();
  }, [isPlaying, resetCollapseTimer]);

  const prevTrack = useCallback(() => {
    wasPlayingRef.current = isPlaying;
    const prev = (currentTrackRef.current - 1 + tracks.length) % tracks.length;
    currentTrackRef.current = prev;
    setCurrentTrack(prev);
    savePrefs(isMutedRef.current, prev);
    crossfadeFnRef.current(prev);
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
    const active = activeSlotRef.current === "a" ? audioARef.current : audioBRef.current;
    if (active && active.paused) {
      wasPlayingRef.current = true;
      active.play().catch(() => { /* autoplay blocked */ });
    }
    setIsExpanded(true);
    resetCollapseTimer();
  }, [resetCollapseTimer]);

  // Dismiss first-visit glow after animation ends (3 pulses × 1.5s = 4.5s)
  useEffect(() => {
    if (!isFirstVisit) return;
    const timer = setTimeout(() => setIsFirstVisit(false), 4500);
    return () => clearTimeout(timer);
  }, [isFirstVisit]);

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
        }${isFirstVisit ? " music-player-glow" : ""}`}
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
              {/* Previous */}
              <button
                className="music-player-btn"
                onClick={prevTrack}
                aria-label="Previous track"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2.5" y="2.5" width="2.5" height="11" rx="0.5" />
                  <path d="M13 2.5v11l-7-5.5z" />
                </svg>
              </button>

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
