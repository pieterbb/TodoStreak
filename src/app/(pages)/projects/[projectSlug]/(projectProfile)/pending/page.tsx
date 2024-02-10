import TodoFeed from '@/components/todo/TodoFeed'
import { getProjectPageDetails } from '@/lib/prismaQueries'

export default async function Pending({
  params,
}: {
  params: { projectSlug: string }
}) {
  const projectDetails = await getProjectPageDetails(params?.projectSlug)

  return (
    <>
      <TodoFeed isTodoDoneFilter={false} projectId={projectDetails?.id} />
    </>
  )
}
