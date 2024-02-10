import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useCreateTodoReply = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      todoId,
      reply,
    }: {
      todoId: string
      reply: { content: string }
    }) => {
      return await axios.post(`/api/todos/${todoId}/replies/`, reply)
    },
  })
}
