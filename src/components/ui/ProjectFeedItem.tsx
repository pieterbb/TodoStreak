import Box from '@/components/ui/Box'
import UserBadge from '@/components/ui/badges/UserBadge'
import { getRecentProjects } from '@/lib/prismaQueries'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectFeedItem({
  project,
}: {
  project: getRecentProjects[0]
}) {
  const { avatar = '', pitch, slug, name, user } = project || {}

  return (
    <Box>
      <div className=" space-y-4 divide-y divide-slate-100 p-4 ">
        <Link href={`/projects/${slug}`}>
          <div className="p-2">
            <div className="flex justify-between space-x-8 ">
              <div>
                <p className="text-xl font-bold text-gray-800 hover:underline">
                  {name}
                </p>
                <p className="font-regular break-all">{pitch}</p>
              </div>

              {avatar && (
                <Image
                  src={avatar}
                  width={16}
                  height={16}
                  className="h-16 w-16 rounded-md "
                  alt=""
                />
              )}
            </div>
          </div>
        </Link>
        <div className="flex items-center space-x-2 py-2">
          <UserBadge user={user} />
        </div>
      </div>
    </Box>
  )
}
