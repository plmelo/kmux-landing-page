import { notFound } from 'next/navigation'
import cliReference from '@/data/docs/cli-reference.json'
import CommandReference from '@/components/CommandReference'

export async function generateStaticParams() {
  return cliReference.commands.map(cmd => ({ command: cmd.name }))
}

interface PageProps {
  params: Promise<{ command: string }>
}

export default async function CommandPage({ params }: PageProps) {
  const { command: commandName } = await params
  const command = cliReference.commands.find(c => c.name === commandName)

  if (!command) {
    notFound()
  }

  return <CommandReference command={command} />
}
