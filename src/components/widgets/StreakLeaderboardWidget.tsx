import Box from '@/components/ui/Box'
import AvatarUser from '@/components/ui/avatar/AvatarUser'
import WidgetTitle from '@/components/ui/typography/WidgetTitle'
import { getDoneTodosPrisma } from '@/lib/prismaQueries'
import { calculateStreaksLeaderboard } from '@/lib/utils'
import Link from 'next/link'

export default async function StreakLeaderboardWidget() {
  const doneTodos = await getDoneTodosPrisma()
  const userStreaks = calculateStreaksLeaderboard(doneTodos)

  // Don't render anything if no streaks
  if (userStreaks.length === 0) {
    return null
  }

  return (
    <Box>
      <div className="space-y-4 p-4">
        <WidgetTitle>🔥 STREAKS</WidgetTitle>
        {userStreaks.slice(0, 20)?.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex items-center space-x-2 text-gray-900">
                <AvatarUser user={item?.user} />
                <Link
                  href={`/${item.user.name}`}
                  className="flex items-center space-x-2"
                >
                  <p className="font-bold">{item.user.name}</p>
                  <div className="rounded-md bg-orange-200 px-2 py-1 text-xs">
                    🌶️ {item.streak}
                  </div>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </Box>
  )
}
