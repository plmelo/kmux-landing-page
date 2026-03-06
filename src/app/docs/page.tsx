import Link from 'next/link'

export default function DocsHomePage() {
  return (
    <div className="space-y-8 relative z-10">
      <div>
        <h1 className="neon-text-pink text-3xl md:text-5xl font-bold mb-4 font-[var(--font-orbitron)]">
          Kmux Documentation
        </h1>
        <p className="text-lg md:text-xl text-white/80">
          Everything you need to know about Kmux, the work multiplexer for multi-project, multi-AI development.
        </p>
      </div>

      {/* Section divider */}
      <div className="section-divider" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
        <Link href="/docs/getting-started" className="neon-card rounded-xl p-8 hover:border-[var(--color-neon-pink)] transition-all group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-pink)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="neon-text-pink text-2xl font-bold mb-3 font-[var(--font-orbitron)] relative z-10">
            Getting Started →
          </h2>
          <p className="text-white/70 leading-relaxed relative z-10">
            Install Kmux and set up your first project in 5 minutes. Learn the core concepts and workflow.
          </p>
        </Link>

        <Link href="/docs/cli/init" className="neon-card rounded-xl p-8 hover:border-[var(--color-neon-pink)] transition-all group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="neon-text-pink text-2xl font-bold mb-3 font-[var(--font-orbitron)] relative z-10">
            CLI Reference →
          </h2>
          <p className="text-white/70 leading-relaxed relative z-10">
            Complete command reference for all kmux commands. Flags, examples, and detailed descriptions.
          </p>
        </Link>
      </div>

      {/* Section divider */}
      <div className="section-divider" />

      <div className="neon-card rounded-xl p-8 bg-[var(--color-bg-card)] border-[var(--color-neon-yellow)]/20 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="neon-text-cyan text-lg font-bold mb-4 font-[var(--font-orbitron)] flex items-center gap-2">
          <span className="text-[var(--color-neon-yellow)]">⚡</span>
          Quick Links
        </h3>
        <ul className="space-y-3 text-white/70">
          <li>
            <Link href="/docs/cli/init" className="hover:text-[var(--color-neon-pink)] transition-colors flex items-center gap-2">
              <span className="text-[var(--color-neon-pink)]">→</span>
              <code className="font-mono text-sm text-[var(--color-neon-cyan)]">kmux init</code>
              <span>— Register a project</span>
            </Link>
          </li>
          <li>
            <Link href="/docs/cli/up" className="hover:text-[var(--color-neon-pink)] transition-colors flex items-center gap-2">
              <span className="text-[var(--color-neon-pink)]">→</span>
              <code className="font-mono text-sm text-[var(--color-neon-cyan)]">kmux up</code>
              <span>— Start a project</span>
            </Link>
          </li>
          <li>
            <Link href="/docs/cli/switch" className="hover:text-[var(--color-neon-pink)] transition-colors flex items-center gap-2">
              <span className="text-[var(--color-neon-pink)]">→</span>
              <code className="font-mono text-sm text-[var(--color-neon-cyan)]">kmux switch</code>
              <span>— Switch projects</span>
            </Link>
          </li>
          <li>
            <Link href="/docs/cli/list" className="hover:text-[var(--color-neon-pink)] transition-colors flex items-center gap-2">
              <span className="text-[var(--color-neon-pink)]">→</span>
              <code className="font-mono text-sm text-[var(--color-neon-cyan)]">kmux list</code>
              <span>— List all projects</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
