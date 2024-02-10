import Box from '@/components/ui/Box'
import Link from 'next/link'

export default function GenericActionButtonWidget({
  buttonText,
  url,
}: {
  buttonText: string
  url: string
}) {
  return (
    <Box>
      <div className=" p-4 no-underline drop-shadow-lg hover:no-underline">
        <Link href={url}>
          <div className="cursor-pointer rounded-lg bg-gray-800 px-4 py-2 text-center text-lg font-bold text-gray-100 hover:bg-gray-900">
            {buttonText}
          </div>
        </Link>
      </div>
    </Box>
  )
}
