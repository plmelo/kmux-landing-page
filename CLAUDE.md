# CLAUDE.md

## Project Overview

Landing page for **kmux** (work multiplexer) — a vendor-neutral control plane for multi-project, multi-AI development. This is a standalone Next.js site, separate from the kmux CLI repo at `~/projects/kmux`.

**Theme:** Retrowave / synthwave 80s aesthetic with neon glows, CRT scanlines, perspective grid, and animated effects.

**Live dev server:** `next dev -p 3050` (port 3050 to avoid conflicts)

## Tech Stack

- **Framework:** Next.js 16.1.6, App Router, TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based config via `@theme inline` in globals.css, NOT tailwind.config.js)
- **Fonts (Google via next/font):** Orbitron (display/headings), Space Grotesk (body), JetBrains Mono (code/terminal)
- **CSS variables:** `--font-orbitron`, `--font-space-grotesk`, `--font-jetbrains-mono`
- **No component library** — all custom components

## Build & Dev Commands

```bash
npm run dev           # Start dev server (use: npm run dev -- -p 3050)
npm run build         # Production build
npm run lint          # ESLint
```

## File Structure

```
src/
├── app/
│   ├── globals.css        # Full retrowave theme: colors, animations, utility classes
│   ├── layout.tsx         # Root layout with font loading and metadata
│   ├── page.tsx           # Single-page landing (all sections)
│   └── favicon.ico
└── components/
    ├── SlotMachine.tsx    # Hero animation — cycling words + ".mux"
    └── TerminalDemo.tsx   # Terminal typing animation (IntersectionObserver)
```

## Design System

### Color Palette (defined in globals.css `@theme inline`)
- `--color-neon-pink: #ff2d95` — Primary accent, CTAs, borders
- `--color-neon-cyan: #00fff9` — Secondary accent, headings, links
- `--color-neon-yellow: #ffe44d` — Tertiary, highlights
- `--color-neon-purple: #b537f2` — Ambient glows
- `--color-neon-orange: #ff6b35` — Sun, gradients
- `--color-bg-dark: #0a0014` — Page background
- `--color-bg-card: rgba(20, 10, 45, 0.7)` — Card backgrounds

### Key CSS Classes (globals.css)
- `.scanlines` — CRT scanline overlay (fixed, z-50)
- `.vhs-line` — VHS tracking line animation
- `.retro-grid` — Perspective grid with scroll animation
- `.retro-sun` / `.retro-sun-stripes` — Synthwave sun with horizontal line cutouts
- `.stars` — Star field via radial gradients
- `.neon-text-pink` / `.neon-text-cyan` — Neon glow text
- `.gradient-text` — Animated rainbow gradient text
- `.neon-card` / `.neon-card-pro` — Glass-morphism cards with glow
- `.btn-neon-pink` / `.btn-neon-cyan` — CTA buttons
- `.terminal-window` / `.terminal-titlebar` — macOS-style terminal chrome
- `.section-divider` — Gradient line between sections
- `.shimmer` — Shimmer animation for coming-soon badges

### Animations (keyframes in globals.css)
- `grid-scroll` — Perspective grid scrolling
- `neon-pulse` — Text shadow pulsing
- `float` — Gentle vertical float
- `fade-in` / `fade-slide-up` — Entry animations
- `sun-glow` — Sun box-shadow pulse
- `gradient-text` — Background position cycling
- `vhs-tracking` — VHS line sweep
- `flicker` — Neon flicker
- `border-glow-pulse` — Card border pulse
- `flash-burst` — Slot machine "w" landing flash
- `kmux-burst` — Radial glow expansion from center (w landing)
- `neon-flicker-on` — Neon sign ignite flicker (mux text on w landing)

## Component Details

### SlotMachine.tsx (Hero)
Cycling slot machine: words slide up through a fixed-width reel, while ".mux" stays static.

**Word list:** dev, task, port, mcp, warp, w — each with a unique color and hold duration.

**Key mechanics:**
- Starts on "w" (W_INDEX = last item). When landing on "w", triggers a flash/glow effect.
- Phase-based state machine: "idle" (no CSS transition) → "sliding" (0.4s ease-in-out). This prevents visual artifacts when resetting index.
- `onTransitionEnd` filtered by `e.propertyName === "transform"` to prevent double-firing (transform + opacity both trigger the event).
- Ref-based width measurement: renders all words in a hidden span, measures max `offsetWidth`, sets reel to exact pixel width. Prevents horizontal jitter during slides.
- Words are right-aligned within the measured-width reel.
- Glow states: "none" | "flash" (brightness 3x + pink drop-shadow + scale 1.06) | "rest" (brightness 1.3x). Applied via CSS `filter` on the outer container span.
- "mux" text is white for all words, turns neon-pink with glow when "w" is active. Uses `burstKey` to re-key the span and trigger `neon-flicker-on` CSS animation on each w landing.
- Radial glow burst: absolutely positioned element behind text, animated via `kmux-burst` keyframe (expands from center and fades). Re-triggered via `burstKey` increment.
- Variable hold times: 1800ms for regular words, 3500ms for "w".

**Known gotchas (already fixed, don't reintroduce):**
1. Don't use a single boolean for animation state — use phase-based ("idle"/"sliding") with `transition: "none"` during idle to prevent snap-back animation.
2. `onTransitionEnd` fires per CSS property — always filter by `propertyName`.
3. Container width must be fixed (measured) to prevent horizontal shift during word transitions.
4. Glow/flash must use CSS `filter` on the outer container, not an overlay div, to cover all child elements uniformly.

### TerminalDemo.tsx
Typing-style terminal animation triggered by IntersectionObserver (threshold 0.3). Shows `kmux init`, `kmux up`, `kmux switch` commands with line-by-line reveal. Blinking cursor appears after all lines.

## Page Sections (page.tsx, top to bottom)

1. **Navbar** — Fixed top, kmux logo + nav links + "Start Free Trial" CTA
2. **Hero** — Star field, sun, perspective grid, horizon glow, dark vignette for legibility, SlotMachine component, subtitle, dual CTAs
3. **Works With** — Logo bar: Claude Code, Cursor, GitHub Copilot, OpenAI Codex, Gemini Code Assist
4. **Features** — 6 cards: Context Switching, Port Management, MCP Server, tmux Orchestration, Terminal Capture, Workflow Intelligence
5. **Terminal Demo** — TerminalDemo component with typing animation
6. **The Problem** — Stats cards (8+ switches/day, 23min focus recovery, 100% port collisions preventable)
7. **How It Works** — 3 steps: Initialize, Launch, Switch
8. **MCP Highlight** — Split layout: description + terminal showing Claude querying kmux MCP
9. **Pricing** — 2 tiers: Free ($0) and Pro ($12/mo annual, $15/mo monthly)
10. **Final CTA** — "Ready to multiplex?" with gradient text
11. **Footer** — 4-column: logo, Product, Resources, Legal links

## Pricing Model

**Free ($0/forever):**
- CLI project management
- Up to 3 projects
- tmux orchestration
- Port management
- Event logging

**Pro ($12/mo annual, $15/mo monthly):**
- Everything in Free
- Unlimited projects
- MCP Server for AI tools (key paid differentiator)
- Terminal capture for AI context
- Priority support
- 14-day free trial

**No Teams tier.** MCP server access is the primary monetization lever.

## kmux Product Context

kmux is a Go CLI (`~/projects/kmux`) with these commands: `init`, `up`, `down`, `switch`, `status`, `list`, `rm`, `port`, `doctor`. v0.1 (CLI) is complete. v0.2 (MCP Server) is next.

**Core value prop:** One command switches your entire dev context — tmux sessions, port ranges, environment, AI tool awareness. No more hunting through terminal tabs or fixing port collisions.

**MCP integration (v0.2):** Exposes project state via Model Context Protocol. Resources use `kmux://` URI scheme. Any MCP-compatible AI tool can query running projects, read terminal output, and report task completions.

**State machine:** STOPPED → (kmux up) → RUNNING → (kmux switch) → SUSPENDED → (kmux switch/up) → RUNNING

**Port management:** Each project gets a 100-port range (e.g., 3000-3099, 3100-3199). Auto-assigned, no collisions.

For full product details, see `~/projects/kmux/kmux-docs/PRD.md` and `~/projects/kmux/kmux-docs/BUILD-PLAN.md`.

## Design Decisions

- Retrowave 80s theme — chosen for memorability and differentiation in dev tool space
- Single-page layout — no routing needed, all sections on one page with smooth scroll
- No component library (shadcn, etc.) — everything is custom CSS for full control of the aesthetic
- Tailwind v4 with `@theme inline` — no tailwind.config.js, all theme values in CSS
- Dark vignette between hero content and sun — prevents CTA text from blending with sun gradient
- Hero h1 uses `flex justify-center` to center the slot machine component
