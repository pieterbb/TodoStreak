import TodoFeed from '@/components/todo/TodoFeed'
import { getProjectPageDetails } from '@/lib/prismaQueries'

export default async function Done({
  params,
}: {
  params: { projectSlug: string }
}) {
  const projectDetails = await getProjectPageDetails(params?.projectSlug)

  return (
    <>
      <TodoFeed isTodoDoneFilter={true} projectId={projectDetails?.id} />
    </>
  )
}
