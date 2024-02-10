import TodoFeed from '@/components/todo/TodoFeed'
import { getUserDetailsByName } from '@/lib/prismaQueries'

export default async function Pending({
  params,
}: {
  params: { username: string }
}) {
  const userDetails = await getUserDetailsByName(params?.username)
  return (
    <>
      <TodoFeed isTodoDoneFilter={false} userId={userDetails?.id} />
    </>
  )
}
