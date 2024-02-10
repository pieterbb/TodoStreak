import { Categories } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type CreateTopicReplyParams = {
  content: string
  topicId: string
  category: Categories
}

export const useCreateTopicReply = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({
      content,
      topicId,
      category,
    }: CreateTopicReplyParams) => {
      return await axios.post(`/api/topics/${category}/${topicId}/replies`, {
        content,
      })
    },
    onSuccess: async () => {
      router.refresh()
    },
  })
}
