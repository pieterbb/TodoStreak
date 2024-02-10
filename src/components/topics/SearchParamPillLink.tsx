'use client'
import PillLinkButton from '@/components/ui/button/PillLinkButton'
import { useSearchParams } from 'next/navigation'

export default function SearchParamPillLink({
  slug,
  text,
}: {
  slug: string
  text: string
}) {
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort')
  const isActive = text.toLowerCase() === sort
  return <PillLinkButton link={slug} text={text} active={isActive} />
}
