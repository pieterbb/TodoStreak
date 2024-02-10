import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type CreateTodoParams = {
  content: string
  done: boolean
  attachments: string[]
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ content, done, attachments }: CreateTodoParams) => {
      return await axios.post(`/api/todos/`, {
        content,
        done,
        attachments,
      })
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
