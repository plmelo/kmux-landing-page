"use client";

import { useRef, useState, useEffect } from "react";

const terminalLines = [
  { type: "command", text: "$ qmux init" },
  { type: "success", text: '  \u2713 Project \'my-saas\' registered' },
  { type: "success", text: "  \u2713 Port range: 3100-3199" },
  { type: "success", text: "  \u2713 Config: .qmux.yaml" },
  { type: "blank", text: "" },
  { type: "command", text: "$ qmux up my-saas" },
  { type: "success", text: "  \u2713 tmux session 'my-saas' created" },
  { type: "success", text: "  \u2713 Dev server on :3100" },
  { type: "success", text: "  \u2713 Ready" },
  { type: "blank", text: "" },
  { type: "command", text: "$ qmux switch client-app" },
  { type: "info", text: "  \u2713 my-saas suspended (state saved)" },
  { type: "info", text: "  \u2713 client-app resumed" },
  { type: "success", text: "  \u2713 Attached to client-app" },
];

export default function TerminalDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= terminalLines.length) clearInterval(interval);
          }, 120);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="terminal-window max-w-2xl mx-auto">
      <div className="terminal-titlebar">
        <div className="terminal-dot" style={{ background: "#ff5f57" }} />
        <div className="terminal-dot" style={{ background: "#febc2e" }} />
        <div className="terminal-dot" style={{ background: "#28c840" }} />
        <span className="ml-3 text-sm opacity-50 font-mono">
          qmux &mdash; terminal
        </span>
      </div>
      <div className="p-6 font-mono text-sm leading-7">
        {terminalLines.map((line, i) => (
          <div
            key={i}
            className={`transition-all duration-300 ${
              i < visibleCount
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1"
            } ${
              line.type === "command"
                ? "text-neon-cyan font-bold"
                : line.type === "success"
                ? "text-green-400"
                : line.type === "info"
                ? "text-neon-yellow"
                : ""
            }`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {line.type === "blank" ? "\u00A0" : line.text}
          </div>
        ))}
        <div
          className={`transition-all duration-500 ${
            visibleCount >= terminalLines.length
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{ transitionDelay: `${terminalLines.length * 40 + 200}ms` }}
        >
          <span className="text-neon-cyan">$</span>
          <span className="ml-1 inline-block w-2.5 h-5 bg-neon-cyan animate-neon-pulse align-middle" />
        </div>
      </div>
    </div>
  );
}
