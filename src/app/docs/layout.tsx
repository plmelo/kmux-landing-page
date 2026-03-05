import { ReactNode } from 'react'
import Link from 'next/link'
import DocsNav from '@/components/DocsNav'
import 'highlight.js/styles/tokyo-night-dark.css'

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Ambient background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated perspective grid */}
        <div className="absolute bottom-0 left-0 right-0 h-[400px] opacity-30">
          <div className="retro-grid" style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150%',
            height: '100%'
          }} />
        </div>

        {/* Retro sun (smaller, subtler) */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] opacity-20">
          <div className="retro-sun" />
          <div className="retro-sun-stripes" />
        </div>

        {/* Stars field */}
        <div className="stars absolute inset-0 opacity-40" />

        {/* Horizon glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[var(--color-neon-pink)]/10 via-[var(--color-neon-purple)]/5 to-transparent" />

        {/* VHS line */}
        <div className="vhs-line" />

        {/* Side accent glows */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[var(--color-neon-cyan)]/8 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[var(--color-neon-purple)]/8 blur-[120px] rounded-full" />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-[var(--color-bg-dark)]/90 backdrop-blur-sm border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <span className="text-xl md:text-2xl font-bold neon-text-pink font-[var(--font-orbitron)] tracking-wider">Kmux</span>
            <span className="text-white/30">/</span>
            <span className="text-white/60 text-base md:text-lg">docs</span>
          </Link>
          <Link
            href="/"
            className="text-xs md:text-sm text-white/60 hover:text-[var(--color-neon-cyan)] transition-colors"
          >
            ← Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <DocsNav />
          </aside>

          {/* Mobile nav dropdown */}
          <div className="lg:hidden mb-6">
            <details className="neon-card rounded-xl p-4">
              <summary className="cursor-pointer font-bold text-[var(--color-neon-pink)] flex items-center justify-between">
                <span>📖 Navigation</span>
                <span className="text-[var(--color-neon-cyan)]">▼</span>
              </summary>
              <div className="mt-4">
                <DocsNav />
              </div>
            </details>
          </div>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
