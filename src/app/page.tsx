import TerminalDemo from "@/components/TerminalDemo";
import SlotMachine from "@/components/SlotMachine";
import MusicPlayer from "@/components/MusicPlayer";

const features = [
  {
    icon: "\u26A1",
    title: "Instant Context Switching",
    description:
      "One command suspends your current project and resumes the target. tmux session, ports, environment \u2014 everything follows. Under a second.",
  },
  {
    icon: "\uD83D\uDD0C",
    title: "Zero Port Collisions",
    description:
      "Every project gets its own 100-port range, auto-assigned. No more localhost:3000 fights. No more broken OAuth redirects.",
  },
  {
    icon: "\uD83E\uDD16",
    title: "MCP Server for AI Tools",
    description:
      "AI tools query your project state natively via Model Context Protocol. Which projects are running, live terminal output, task completions \u2014 all queryable. No vendor lock-in.",
  },
  {
    icon: "\uD83D\uDCDF",
    title: "tmux Orchestration",
    description:
      "Named panes, custom layouts, per-project sessions with pre/post hooks. Not a replacement for tmux \u2014 an orchestration layer on top of it.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "No login required \u2014 runs standalone",
    features: [
      "CLI project management",
      "Up to 3 projects",
      "tmux orchestration",
      "Port management",
      "Event logging",
    ],
    cta: "Get Started",
    ctaStyle: "btn-neon-cyan",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo billed annually",
    monthlyNote: "$15/mo billed monthly",
    description: "Full power for serious developers",
    features: [
      "Everything in Free",
      "Unlimited projects",
      "MCP Server for AI tools",
      "Terminal capture for AI context",
      "Priority support",
      "14-day free trial",
    ],
    cta: "Join Waitlist",
    ctaStyle: "btn-neon-pink",
    highlighted: true,
  },
];

const beforeItems = [
  "6 terminals, hunting for the right one",
  "localhost:3000 wars between projects",
  "23 minutes to regain focus after every switch",
  "AI tools blind to what\u2019s running where",
  "Fragile bash scripts holding it together",
];

const afterItems = [
  "One command switches entire context",
  "Auto-assigned port ranges, zero collisions",
  "Context switch in under a second",
  "AI tools query live project state via MCP",
  "Declarative config, fully reproducible",
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg-dark text-white overflow-x-hidden">
      {/* CRT Scanlines */}
      <div className="scanlines" />

      {/* VHS Tracking Line */}
      <div className="vhs-line animate-vhs-tracking" />

      {/* ═══════════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold neon-text-pink tracking-wider">
              qmux
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-white/60 hover:text-neon-cyan transition-colors"
            >
              Features
            </a>
            <a
              href="#demo"
              className="text-sm text-white/60 hover:text-neon-cyan transition-colors"
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="text-sm text-white/60 hover:text-neon-cyan transition-colors"
            >
              Pricing
            </a>
          </div>

          <a
            href="#pricing"
            className="btn-neon-pink text-sm !py-2.5 !px-5"
          >
            Get qmux
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Star field */}
        <div className="stars absolute inset-0 z-0" />

        {/* Sun */}
        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 z-[2]">
          <div className="retro-sun animate-sun-glow">
            <div className="retro-sun-stripes" />
          </div>
        </div>

        {/* Horizon glow line */}
        <div className="horizon-glow" />

        {/* Perspective Grid */}
        <div className="retro-grid animate-grid-scroll z-[3]" />

        {/* Ambient glow behind content */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-purple/10 rounded-full blur-[120px] z-[1]" />

        {/* Dark vignette between content and sun for legibility */}
        <div className="absolute inset-x-0 top-[35%] bottom-[20%] z-[4] pointer-events-none" style={{
          background: "radial-gradient(ellipse 90% 50% at 50% 65%, rgba(10,0,20,0.35) 0%, rgba(10,0,20,0.15) 40%, transparent 75%)"
        }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 mb-32 pt-20 md:pt-0 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-slide-up opacity-0 leading-tight flex justify-center">
            <SlotMachine />
          </h1>

          <p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed animate-fade-slide-up opacity-0"
            style={{ animationDelay: "0.3s", textShadow: "0 0 20px rgba(10,0,20,0.9), 0 0 40px rgba(10,0,20,0.7)" }}
          >
            6 terminals. 3 projects. Ports colliding. Context lost.
            <br />
            <span className="text-white/90 font-semibold">One command fixes all of it.</span>
          </p>

          <p
            className="text-base text-white/50 max-w-xl mx-auto mb-10 animate-fade-slide-up opacity-0"
            style={{ animationDelay: "0.45s", textShadow: "0 0 10px rgba(10,0,20,1), 0 0 30px rgba(10,0,20,1), 0 0 60px rgba(10,0,20,0.9), 0 0 90px rgba(10,0,20,0.7)" }}
          >
            tmux orchestration and AI-awareness. Built in.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-slide-up opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            <a href="#pricing" className="btn-neon-pink text-lg">
              Get qmux Free
            </a>
            <a href="#demo" className="btn-neon-cyan text-lg">
              See It In Action
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BEFORE / AFTER
          ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 neon-text-cyan">
              Before &amp; after
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="before-col rounded-xl p-8">
              <h3 className="font-display text-lg font-bold text-red-400 mb-6 uppercase tracking-wider">
                Without qmux
              </h3>
              <ul className="space-y-4">
                {beforeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="text-red-400 mt-0.5 shrink-0">{"\u2717"}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="after-col rounded-xl p-8">
              <h3 className="font-display text-lg font-bold text-neon-cyan mb-6 uppercase tracking-wider">
                With qmux
              </h3>
              <ul className="space-y-4">
                {afterItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="text-neon-cyan mt-0.5 shrink-0">{"\u2713"}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          TERMINAL DEMO
          ═══════════════════════════════════════════ */}
      <section id="demo" className="relative z-10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 neon-text-cyan">
              Three commands. Full control.
            </h2>
          </div>

          <TerminalDemo />

          <div className="text-center mt-10">
            <code className="inline-block font-mono text-neon-cyan bg-white/5 border border-neon-cyan/20 px-6 py-2.5 rounded-lg text-sm">
              $ brew install qmux
            </code>
            <p className="text-white/30 text-xs mt-3 font-mono">
              macOS &amp; Linux
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          FEATURES
          ═══════════════════════════════════════════ */}
      <section id="features" className="relative z-10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="neon-text-cyan">Everything you need.</span>
              <br />
              <span className="text-white/80">Nothing you don&apos;t.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="neon-card rounded-xl p-8"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-lg font-bold text-neon-pink mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          PRICING
          ═══════════════════════════════════════════ */}
      <section id="pricing" className="relative z-10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 neon-text-cyan">
              Simple pricing. No surprises.
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Start free. Upgrade when you need MCP and unlimited projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`neon-card rounded-xl p-8 flex flex-col relative ${
                  plan.highlighted
                    ? "neon-card-pro md:scale-105 md:-my-4"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="shimmer absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-purple px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                    Coming Soon
                  </div>
                )}

                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-white/40 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-white/40 text-sm ml-1">
                      {plan.period}
                    </span>
                  )}
                  {plan.monthlyNote && (
                    <div className="text-white/30 text-xs mt-1">
                      {plan.monthlyNote}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-white/60"
                    >
                      <span className="text-neon-pink mt-0.5">{"\u2713"}</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`${plan.ctaStyle} text-center text-sm w-full`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-neon-pink/5 rounded-full blur-[100px]" />

          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 relative">
            <span className="gradient-text animate-gradient-text">
              Stop drowning in terminals.
            </span>
          </h2>
          <p className="text-white/50 text-lg mb-10 relative">
            Start shipping.
          </p>
          <a href="#pricing" className="btn-neon-pink text-lg relative">
            Get qmux Free
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <span className="font-display text-2xl font-bold neon-text-pink tracking-wider">
                qmux
              </span>
              <p className="text-white/30 text-sm mt-3 leading-relaxed">
                One command switches everything.
              </p>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold text-white/60 uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Changelog", "Roadmap"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/30 text-sm hover:text-neon-cyan transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold text-white/60 uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                {["Documentation", "GitHub", "Discord", "Blog"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 text-sm hover:text-neon-cyan transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold text-white/60 uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                {["Privacy", "Terms", "License"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 text-sm hover:text-neon-cyan transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-sm">
              &copy; 2026 qmux. All rights reserved.
            </p>
            <p className="text-white/20 text-xs font-mono">
              Works with Claude Code, Cursor, Copilot, and any MCP-compatible tool.
            </p>
          </div>
        </div>
      </footer>

      {/* Music Player Widget */}
      <MusicPlayer />
    </div>
  );
}
