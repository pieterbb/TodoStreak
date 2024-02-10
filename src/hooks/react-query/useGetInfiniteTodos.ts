import { getTodosPrisma } from '@/lib/prismaQueries'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

export const getTodos = async (
  isTodoDoneFilter: boolean,
  userId: string | undefined,
  projectId: string | undefined,
  pageParam: string | undefined
): Promise<getTodosPrisma> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`

  const params = {
    cursor: pageParam,
    isTodoDoneFilter: isTodoDoneFilter,
    userId: userId,
    projectId: projectId,
  }

  return await axios.get(url, { params }).then((response) => {
    return response.data.content
  })
}

export const useInfiniteTodos = (
  isTodoDoneFilter: boolean,
  userId: string | undefined,
  projectId: string | undefined
) => {
  return useInfiniteQuery({
    queryKey: ['todos', isTodoDoneFilter, userId, projectId],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getTodos(isTodoDoneFilter, userId, projectId, pageParam), // Pass pageParam here
    getNextPageParam: (lastPage) => {
      return lastPage[lastPage.length - 1]?.id
    },
    initialPageParam: undefined,
  })
}
