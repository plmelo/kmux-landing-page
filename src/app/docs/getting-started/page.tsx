import fs from 'fs/promises'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default async function GettingStartedPage() {
  const mdPath = path.join(process.cwd(), 'src/data/docs/getting-started.md')
  const content = await fs.readFile(mdPath, 'utf-8')

  return (
    <div className="prose prose-invert max-w-none
      prose-headings:font-[var(--font-orbitron)]
      prose-h1:neon-text-pink prose-h1:text-5xl prose-h1:mb-6
      prose-h2:neon-text-cyan prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
      prose-h3:text-white prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
      prose-h4:text-white/80 prose-h4:text-lg prose-h4:mt-6
      prose-p:text-white/80 prose-p:leading-relaxed
      prose-a:text-[var(--color-neon-pink)] prose-a:no-underline hover:prose-a:text-[var(--color-neon-cyan)] prose-a:transition-colors
      prose-code:text-[var(--color-neon-cyan)] prose-code:font-[var(--font-jetbrains-mono)] prose-code:text-sm
      prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-black/50 prose-pre:border prose-pre:border-[var(--color-neon-cyan)]/20 prose-pre:rounded-lg
      prose-pre:p-4 prose-pre:overflow-x-auto
      prose-pre:font-[var(--font-jetbrains-mono)] prose-pre:text-sm
      prose-strong:text-white prose-strong:font-bold
      prose-ul:text-white/80 prose-ul:my-4
      prose-ol:text-white/80 prose-ol:my-4
      prose-li:my-2
      prose-li:marker:text-[var(--color-neon-pink)]
      prose-table:border prose-table:border-[var(--color-neon-cyan)]/20 prose-table:my-8
      prose-th:bg-black/30 prose-th:text-[var(--color-neon-cyan)] prose-th:font-[var(--font-orbitron)] prose-th:p-3
      prose-td:border-white/10 prose-td:p-3
      prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-neon-pink)] prose-blockquote:text-white/70 prose-blockquote:pl-4
    ">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight]
          }
        }}
      />
    </div>
  )
}
