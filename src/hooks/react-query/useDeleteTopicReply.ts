import { Categories } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type DeleteTopicParams = {
  topicId: string
  category: Categories
  replyId: string
}

export const useDeleteTopicReply = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ topicId, category, replyId }: DeleteTopicParams) => {
      return await axios.delete(
        `/api/topics/${category}/${topicId}/replies/${replyId}`
      )
    },
    onSuccess: async () => {
      router.refresh()
    },
  })
}
