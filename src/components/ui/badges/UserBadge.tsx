import AvatarUser from '@/components/ui/avatar/AvatarUser'
import { User } from '@/types/types'
import Link from 'next/link'

export default function UserBadge({ user }: { user: User }) {
  return (
    <div className="flex cursor-pointer items-center space-x-1 ">
      <AvatarUser user={user} size={12} />
      <div>
        <div className="flex items-center space-x-1 text-lg font-medium">
          <Link href={`/${user?.name}`}>
            <div className="text-gray-800">{user?.displayName}</div>
          </Link>
        </div>
        <Link href={`/${user?.name}`}>
          <div>@{user?.name}</div>
        </Link>
      </div>
    </div>
  )
}
