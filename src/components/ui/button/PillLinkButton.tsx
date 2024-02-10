import Link from 'next/link'

export default function PillLinkButton({
  link,
  text,
  active = false,
}: {
  link: string
  text: string
  active?: boolean
}) {
  return (
    <Link href={link}>
      <div
        className={`cursor-pointer rounded-full px-4 py-1 font-medium ${
          active
            ? 'bg-blue-100 text-blue-500 hover:bg-blue-200'
            : 'bg-gray-100 text-gray-500'
        } `}
      >
        <p>{text}</p>
      </div>
    </Link>
  )
}
