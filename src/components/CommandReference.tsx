interface Flag {
  name: string
  shorthand?: string
  usage: string
  default?: string
}

interface Command {
  name: string
  use: string
  short: string
  long: string
  flags?: Flag[]
}

export default function CommandReference({ command }: { command: Command }) {
  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <div>
        <h1 className="neon-text-pink text-2xl md:text-4xl font-bold mb-3 font-[var(--font-orbitron)] break-words">
          kmux {command.name}
        </h1>
        <p className="text-white/80 text-base md:text-xl">
          {command.short}
        </p>
      </div>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Usage */}
      <div className="terminal-window rounded-xl overflow-hidden">
        <div className="terminal-titlebar">
          <span>Terminal</span>
        </div>
        <div className="p-4 font-[var(--font-jetbrains-mono)]">
          <span className="text-[var(--color-neon-pink)]">$</span> kmux {command.use}
        </div>
      </div>

      {/* Description */}
      <section>
        <h2 className="neon-text-cyan text-2xl font-bold mb-4 font-[var(--font-orbitron)]">
          Description
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line text-white/80 leading-relaxed">
            {command.long}
          </p>
        </div>
      </section>

      {/* Flags */}
      {command.flags && command.flags.length > 0 && (
        <section>
          <h2 className="neon-text-cyan text-xl md:text-2xl font-bold mb-4 font-[var(--font-orbitron)]">
            Flags
          </h2>
          <div className="neon-card rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[var(--color-neon-cyan)]/30 bg-black/30">
                  <th className="text-left p-4 text-[var(--color-neon-cyan)] font-[var(--font-orbitron)]">Flag</th>
                  <th className="text-left p-4 text-[var(--color-neon-cyan)] font-[var(--font-orbitron)]">Description</th>
                  <th className="text-left p-4 text-[var(--color-neon-cyan)] font-[var(--font-orbitron)]">Default</th>
                </tr>
              </thead>
              <tbody>
                {command.flags.map((flag: Flag, idx: number) => (
                  <tr key={flag.name} className={idx < command.flags!.length - 1 ? "border-b border-white/10" : ""}>
                    <td className="p-4 font-[var(--font-jetbrains-mono)] text-[var(--color-neon-cyan)] whitespace-nowrap">
                      --{flag.name}
                      {flag.shorthand && <span className="text-white/50">, -{flag.shorthand}</span>}
                    </td>
                    <td className="p-4 text-white/80">{flag.usage}</td>
                    <td className="p-4 font-[var(--font-jetbrains-mono)] text-sm text-white/60">
                      {flag.default || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Examples section placeholder */}
      <section className="neon-card rounded-xl p-6 bg-[var(--color-bg-card)] border-[var(--color-neon-cyan)]/20">
        <h3 className="neon-text-cyan text-lg font-bold mb-3 font-[var(--font-orbitron)] flex items-center gap-2">
          <span className="text-[var(--color-neon-yellow)]">📖</span>
          Learn More
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-white/60">
            See the <a href="/docs/getting-started" className="text-[var(--color-neon-pink)] hover:text-[var(--color-neon-cyan)] transition-colors font-semibold">Getting Started Guide</a> for complete workflows and examples of using this command in real quests.
          </p>
        </div>
      </section>
    </div>
  )
}
