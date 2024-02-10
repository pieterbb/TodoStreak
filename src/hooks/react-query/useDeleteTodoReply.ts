import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteTodoReply = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      todoId,
      todoReplyId,
    }: {
      todoId: string
      todoReplyId: string
    }) => {
      return await axios.delete(`/api/todos/${todoId}/replies/${todoReplyId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
