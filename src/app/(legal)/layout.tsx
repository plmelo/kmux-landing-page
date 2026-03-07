import Link from "next/link";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-bg-dark text-white overflow-x-hidden">
      {/* CRT Scanlines */}
      <div className="scanlines" />

      {/* Header */}
      <header className="sticky top-0 z-40 px-6 py-4 bg-[var(--color-bg-dark)]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-display text-xl font-bold neon-text-pink tracking-wider hover:opacity-80 transition-opacity"
            >
              Kmux
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/40 text-sm">Legal</span>
          </div>
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-neon-cyan transition-colors"
          >
            &larr; Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-white/30 text-sm">
            &copy; 2026 Electric Dreams LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
