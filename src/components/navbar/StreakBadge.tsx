import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUserDetailsByName } from '@/lib/prismaQueries'
import { calculateCurrentStreak } from '@/lib/utils'
import { getServerSession } from 'next-auth'

export default async function StreakBadge() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }

  const userData = await getUserDetailsByName(session?.user?.name)
  const currentStreak = calculateCurrentStreak(userData?.todos || [])

  return (
    <div className="flex cursor-pointer items-center justify-center whitespace-nowrap rounded-2xl bg-orange-100 px-4 py-2 text-xs tracking-wider text-orange-800">
      <p>🔥 {currentStreak}</p>
    </div>
  )
}
