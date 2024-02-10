import Box from '@/components/ui/Box'
import WidgetTitle from '@/components/ui/typography/WidgetTitle'
import Image from 'next/image'
import Link from 'next/link'

export default function MediaWidget({ imageURLs }: { imageURLs: string[] }) {
  return (
    <Box>
      <div className="p-4">
        <WidgetTitle>📸 MEDIA</WidgetTitle>
        <div className="grid grid-cols-2 gap-4 ">
          {imageURLs?.slice(0, 10).map((url) => (
            <Link key={url} href={url} className="overflow-hidden">
              <Image
                className="aspect-square h-full w-full rounded-md object-cover"
                src={url}
                alt=""
                width={100}
                height={100}
                style={{ objectFit: 'cover' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </Box>
  )
}
