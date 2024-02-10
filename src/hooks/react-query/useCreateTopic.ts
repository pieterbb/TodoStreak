import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type CreateTopicParams = {
  title: string
  content: string
  category: string
}

export const useCreateTopic = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async ({ title, content, category }: CreateTopicParams) => {
      return await axios.post(`/api/topics/`, {
        title,
        content,
        category,
      })
    },
    onSuccess: async () => {
      router.refresh()
    },
  })
}
