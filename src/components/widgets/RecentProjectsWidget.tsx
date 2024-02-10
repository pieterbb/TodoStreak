import Box from '@/components/ui/Box'
import ProjectWidgetItem from '@/components/ui/ProjectWidgetItem'
import WidgetTitle from '@/components/ui/typography/WidgetTitle'
import { getRecentProjects } from '@/lib/prismaQueries'

export default async function RecentProjectsWidget() {
  const items: getRecentProjects = await getRecentProjects()

  if (!items) {
    return null
  }

  return (
    <Box>
      <div className="mb-4 space-y-2 p-4">
        <WidgetTitle>🌱 NEW PROJECTS</WidgetTitle>
        {items.map((item) => {
          return <ProjectWidgetItem key={item.slug} item={item} />
        })}
      </div>
    </Box>
  )
}
