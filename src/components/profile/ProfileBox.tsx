import Box from '@/components/ui/Box'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function ProfileBox({
  children,
  profileBanner,
  avatar,
  title,
  tag,
  bio,
  editLink,
  displayEditLink,
}: {
  children: ReactNode
  profileBanner?: string
  avatar?: string
  title: string
  tag: string
  bio: string
  ownerId: string
  editLink: string
  displayEditLink: boolean
}) {
  return (
    <Box>
      <div className="relative h-40 w-full rounded-t-lg border-red-700 bg-green-400">
        {profileBanner && (
          <Image
            alt="profile banner"
            fill={true}
            src={profileBanner}
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="relative p-4">
        <div className="absolute -top-16 h-32 w-32 overflow-hidden rounded-full border-2 bg-green-200">
          {avatar && (
            <Image
              alt="profile picture"
              fill={true}
              src={avatar}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        <div>
          {displayEditLink && (
            <div className="flex w-full cursor-pointer justify-end ">
              <Link href={editLink}>
                <div className="rounded-full border px-4 py-1 text-lg font-semibold text-gray-900">
                  Edit
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="mb-4 pt-12 text-xl">
          <div className="text-3xl font-bold text-gray-900">
            <p>{title}</p>
          </div>

          <p>@{tag}</p>
        </div>
        <div className="mb-4 break-words text-lg">
          <p>{bio}</p>
        </div>

        {children}
      </div>
    </Box>
  )
}
