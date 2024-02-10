import NoItems from '@/components/ui/NoItems'
import ActionButtonBanner from '@/components/widgets/GenericActionButtonWidget'
import ProjectFeedItem from '@/components/ui/ProjectFeedItem'
import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import { getRecentProjects } from '@/lib/prismaQueries'

export default async function Projects() {
  const projects = await getRecentProjects()

  return (
    <>
      <ContentLayout>
        {projects && projects.length > 0 ? (
          projects?.map((project) => {
            return <ProjectFeedItem key={project.slug} project={project} />
          })
        ) : (
          <NoItems />
        )}
      </ContentLayout>
      <SidebarLayout>
        <ActionButtonBanner
          buttonText="👉 Add Your Project"
          url="/projects/new"
        />
      </SidebarLayout>
    </>
  )
}
