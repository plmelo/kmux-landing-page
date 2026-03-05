import Link from 'next/link'
import cliReference from '@/data/docs/cli-reference.json'

export default function DocsNav() {
  const commands = cliReference.commands

  return (
    <nav className="sticky top-6 space-y-6">
      <div>
        <h3 className="text-white/60 text-xs font-bold mb-3 uppercase tracking-wider">Getting Started</h3>
        <Link
          href="/docs/getting-started"
          className="block py-1.5 text-white/70 hover:text-[var(--color-neon-pink)] transition-colors"
        >
          Installation & Setup
        </Link>
      </div>

      <div>
        <h3 className="text-white/60 text-xs font-bold mb-3 uppercase tracking-wider">CLI Reference</h3>
        <ul className="space-y-1">
          {commands.map(cmd => (
            <li key={cmd.name}>
              <Link
                href={`/docs/cli/${cmd.name}`}
                className="block py-1.5 font-mono text-sm text-white/60 hover:text-[var(--color-neon-pink)] transition-colors"
              >
                kmux {cmd.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
