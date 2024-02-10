import { cn } from '@/lib/utils'
import { User } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

interface AvatarUserProps {
  user: User
  size?: number
}

export default function AvatarUser({ user, size = 8 }: AvatarUserProps) {
  return (
    <>
      <Link href={`/${user?.name}`}>
        <Image
          alt="profile picture"
          width={size * 4}
          height={size * 4}
          className={cn(
            size === 8 && 'h-8 w-8',
            size === 10 && 'h-10 w-10',
            size === 12 && 'h-12 w-12',
            'rounded-full'
          )}
          src={user?.image || '/avatar.svg'}
          style={{ objectFit: 'cover' }}
        />
      </Link>
    </>
  )
}
