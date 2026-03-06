"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const words = [
  { text: "agent", color: "#00fff9", hold: 1800 },
  { text: "flow", color: "#39ff14", hold: 1800 },
  { text: "queue", color: "#ffe44d", hold: 1800 },
  { text: "mesh", color: "#ff6b35", hold: 1800 },
  { text: "kernel", color: "#b537f2", hold: 1800 },
  { text: "k", color: "#ff2d95", hold: 2000 },
];

const K_INDEX = words.length - 1;
const SLOT_HEIGHT = 1.25; // em — matches leading-tight so baselines align with "mux"
const PEEK = 0.6; // em — generous peek of prev/next words
const REEL_HEIGHT = SLOT_HEIGHT + 2 * PEEK;

export default function SlotMachine() {
  const [currentIndex, setCurrentIndex] = useState(K_INDEX);
  const [phase, setPhase] = useState<"idle" | "sliding">("idle");
  const [glow, setGlow] = useState<"none" | "flash" | "rest">("rest");
  const [reelWidth, setReelWidth] = useState<number | null>(null);
  const [burstKey, setBurstKey] = useState(1);
  const [flickerOffKey, setFlickerOffKey] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Measure widest word at actual rendered size, re-measure after fonts load
  useEffect(() => {
    function measure() {
      if (measureRef.current) {
        let maxW = 0;
        const children = measureRef.current.children;
        for (let i = 0; i < children.length; i++) {
          maxW = Math.max(maxW, (children[i] as HTMLElement).offsetWidth);
        }
        setReelWidth(maxW);
      }
    }
    measure();
    document.fonts.ready.then(measure);
  }, []);

  const scheduleNext = useCallback((index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (words[index].text === "k") {
        setFlickerOffKey(k => k + 1);
        setGlow("none");
      }
      setPhase("sliding");
    }, words[index].hold);
  }, []);

  // Start cycling immediately — don't block on fonts.ready
  useEffect(() => {
    scheduleNext(K_INDEX);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scheduleNext]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (phase === "sliding" && e.propertyName === "transform") {
        const nextIdx = (currentIndex + 1) % words.length;
        setCurrentIndex(nextIdx);
        setPhase("idle");

        if (words[nextIdx].text === "k") {
          setGlow("flash");
          setBurstKey(k => k + 1);
          setTimeout(() => setGlow("rest"), 600);
        } else {
          setGlow("none");
        }

        scheduleNext(nextIdx);
      }
    },
    [phase, currentIndex, scheduleNext]
  );

  // Build 4 word slots: prev, current, next, afterNext
  const prevIdx = (currentIndex - 1 + words.length) % words.length;
  const nextIdx = (currentIndex + 1) % words.length;
  const afterNextIdx = (currentIndex + 2) % words.length;
  const slots = [
    words[prevIdx],
    words[currentIndex],
    words[nextIdx],
    words[afterNextIdx],
  ];

  const slideTransition =
    phase === "sliding" ? "transform 0.3s ease-in-out" : "none";

  const isKActive = glow !== "none";

  const containerFilter =
    glow === "flash"
      ? "brightness(3) drop-shadow(0 0 80px #ff2d95) drop-shadow(0 0 160px #ff2d95)"
      : glow === "rest"
      ? "brightness(1.3) drop-shadow(0 0 30px rgba(255,45,149,0.4))"
      : "none";

  // Smooth multi-stop mask — gentle fade that keeps peek words readable
  const maskGradient = [
    "linear-gradient(to bottom",
    "transparent 0%",
    "rgba(0,0,0,0.5) 10%",
    "rgba(0,0,0,0.85) 18%",
    "black 25%",
    "black 75%",
    "rgba(0,0,0,0.85) 82%",
    "rgba(0,0,0,0.5) 90%",
    "transparent 100%)",
  ].join(", ");

  return (
    <span
      className="relative inline-block"
      style={{
        filter: containerFilter,
        transform: glow === "flash" ? "scale(1.06)" : "scale(1)",
        transition: "filter 0.5s ease, transform 0.3s ease",
      }}
    >
      {/* Hidden measurer — renders all words to find max width */}
      <span
        ref={measureRef}
        className="absolute pointer-events-none whitespace-nowrap"
        aria-hidden="true"
        style={{ visibility: "hidden", position: "absolute", top: 0, left: 0 }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block">
            {w.text}
          </span>
        ))}
      </span>

      {/* Invisible "k" — makes in-flow width = "kmux" so flex centers the brand */}
      <span className="invisible" aria-hidden="true">
        k
      </span>

      {/* mux container — reel positions relative to this inner span */}
      <span className="relative inline-block">
        {/* Radial glow burst on k landing */}
        <span
          key={`burst-${burstKey}`}
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            left: "50%",
            top: "50%",
            width: "3em",
            height: "3em",
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 0,
            background:
              "radial-gradient(circle, rgba(255,45,149,0.6) 0%, rgba(255,45,149,0.15) 40%, transparent 70%)",
            borderRadius: "50%",
            animation:
              burstKey > 0 ? "kmux-burst 0.8s ease-out forwards" : "none",
            zIndex: -1,
          }}
        />

        {/* Slot reel — absolutely positioned to the left of "mux" */}
        <span
          className="absolute text-right"
          style={{
            right: "100%",
            top: `-${PEEK}em`,
            width: reelWidth ?? "7ch",
            height: `${REEL_HEIGHT}em`,
            clipPath: reelWidth ? "inset(0)" : undefined,
            overflow: "hidden",
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
          }}
        >
          {slots.map((word, i) => (
            <span
              key={`${currentIndex}-${i}`}
              className="absolute right-0"
              onTransitionEnd={i === 0 ? handleTransitionEnd : undefined}
              style={{
                top: `${PEEK + (i - 1) * SLOT_HEIGHT}em`,
                transition: slideTransition,
                transform:
                  phase === "sliding"
                    ? `translateY(-${SLOT_HEIGHT}em)`
                    : "translateY(0)",
                color: word.color,
                textShadow: `0 0 20px ${word.color}80, 0 0 40px ${word.color}40`,
              }}
            >
              {word.text}
            </span>
          ))}
        </span>

        {/* "mux" — neon-pink when "k" is active, white otherwise */}
        <span
          key={`mux-${burstKey}-${flickerOffKey}`}
          style={{
            color: isKActive ? "#ff2d95" : "#ffffff",
            textShadow: isKActive
              ? "0 0 20px #ff2d9580, 0 0 40px #ff2d9540, 0 0 80px #ff2d9520"
              : "none",
            animation:
              burstKey > 0 && glow === "flash"
                ? "neon-flicker-on 0.5s ease forwards"
                : flickerOffKey > 0 && !isKActive
                ? "neon-flicker-off 0.6s ease forwards"
                : "none",
          }}
        >
          mux
        </span>
      </span>
    </span>
  );
}
