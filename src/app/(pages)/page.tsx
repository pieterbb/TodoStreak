import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TodoFeed from '@/components/todo/TodoFeed'
import NewItem from '@/components/todo/todoCreate/TodoCreate'
import RecentProjects from '@/components/widgets/RecentProjectsWidget'
import Streaks from '@/components/widgets/StreakLeaderboardWidget'
import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import { getServerSession } from 'next-auth/next'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <>
      <ContentLayout>
        {session && <NewItem />}
        <TodoFeed />
      </ContentLayout>
      <SidebarLayout>
        <RecentProjects />
        <Streaks />
      </SidebarLayout>
    </>
  )
}
