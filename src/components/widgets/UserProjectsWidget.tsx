import Box from '@/components/ui/Box'
import ProjectWidgetItem from '@/components/ui/ProjectWidgetItem'
import WidgetTitle from '@/components/ui/typography/WidgetTitle'
import { getUserDetailsByName } from '@/lib/prismaQueries'

export default function UserProjectsWidget({
  projects,
}: {
  projects: NonNullable<getUserDetailsByName>['projects'] | undefined
}) {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <Box>
      <div className="flex flex-col p-4">
        <WidgetTitle>🌱 NEW PROJECTS</WidgetTitle>
        {projects?.map((project) => {
          return <ProjectWidgetItem key={project.slug} item={project} />
        })}
      </div>
    </Box>
  )
}
