import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useTodoDone = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ todoId }: { todoId: string }) => {
      return await axios.post(`/api/todos/${todoId}/done`)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
