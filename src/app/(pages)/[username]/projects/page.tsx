import NoItems from '@/components/ui/NoItems'
import ProjectWidgetItem from '@/components/ui/ProjectWidgetItem'
import { getUserDetailsByName } from '@/lib/prismaQueries'

export default async function Projects({
  params,
}: {
  params: { username: string }
}) {
  const userDetails = await getUserDetailsByName(params?.username)
  return (
    <>
      {userDetails && userDetails?.projects?.length > 0 ? (
        userDetails.projects.map((item) => (
          <ProjectWidgetItem item={item} key={item.id} />
        ))
      ) : (
        <NoItems />
      )}
    </>
  )
}
