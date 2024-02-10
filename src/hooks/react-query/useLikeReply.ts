import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useLikeReply = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      todoId,
      replyId,
    }: {
      todoId: string
      replyId: string
    }) => {
      return await axios.post(`/api/todos/${todoId}/replies/${replyId}/like`)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
