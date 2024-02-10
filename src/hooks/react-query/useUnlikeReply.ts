import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useUnlikeReply = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      todoId,
      replyId,
    }: {
      todoId: string
      replyId: string
    }) => {
      return await axios.delete(`/api/todos/${todoId}/replies/${replyId}/like`)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
