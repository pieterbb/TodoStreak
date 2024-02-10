'use client'
import PillLinkButton from '@/components/ui/button/PillLinkButton'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function ParamPillLink({
  slug,
  text,
}: {
  slug: string
  text: string
}) {
  const segment = useSelectedLayoutSegment()
  const isActive = text.toLowerCase() === segment
  return <PillLinkButton link={slug} text={text} active={isActive} />
}
