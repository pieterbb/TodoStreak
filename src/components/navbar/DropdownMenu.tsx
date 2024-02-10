import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import StreakBadge from '@/components/navbar/StreakBadge'
import AvatarUser from '@/components/ui/avatar/AvatarUser'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function DropdownMenu() {
  const session = await getServerSession(authOptions)
  const { name, displayName } = session?.user || {}

  if (!session) return null

  return (
    <div className="space-x-2 px-4">
      <div className="relative flex items-center space-x-4">
        <Link href={`/${name}`}>
          <StreakBadge />
        </Link>
        <div className="peer cursor-pointer rounded-full bg-green-400">
          <AvatarUser user={session.user} />
        </div>

        <div className="absolute -right-2 top-8 z-50 hidden w-48 flex-col divide-y-2 rounded-lg bg-white shadow-lg hover:flex peer-hover:flex">
          <div className="flex flex-col space-y-1 break-words  p-4">
            <div className="text-xl font-bold text-gray-900">
              <Link href={`/${name}`}>{displayName}</Link>
            </div>

            <Link href={`/${name}`}>{'@' + name}</Link>
          </div>

          <div className="flex flex-col space-y-4 p-4 text-lg ">
            <Link href={`/${name}`}>
              <div className="cursor-pointer rounded-md p-2 hover:bg-slate-100">
                👤 Profile
              </div>
            </Link>
            <Link href={`/${name}/pending`}>
              <div className="cursor-pointer rounded-md p-2 hover:bg-slate-100">
                ⏳ Pending Todos
              </div>
            </Link>
            <Link href={`/settings`}>
              <div className="cursor-pointer rounded-md p-2 hover:bg-slate-100">
                ⚙️ Settings
              </div>
            </Link>
            <Link href={`/api/auth/signout`}>
              <div className="cursor-pointer rounded-md p-2 hover:bg-slate-100">
                <div className="cursor-pointer">🚪 Sign out</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
