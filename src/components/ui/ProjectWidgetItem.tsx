import { getRecentProjects } from '@/lib/prismaQueries'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectWidgetItem({
  item,
}: {
  item: getRecentProjects[0]
}) {
  return (
    <Link href={`/projects/${item.slug}`}>
      <div className="flex w-full cursor-pointer items-center space-x-2 rounded-md border-2 border-white bg-purple-200 p-2 font-bold hover:border-gray-700">
        {item?.avatar ? (
          <Image
            width={24}
            height={24}
            className="size-8"
            alt=""
            src={`${item.avatar}`}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="size-8 bg-green-300"></div>
        )}
        <p className="font-bold text-gray-800">{item.name}</p>
      </div>
    </Link>
  )
}
