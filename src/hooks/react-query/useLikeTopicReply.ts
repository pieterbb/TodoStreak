import { Categories } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type TopicReplyParams = {
  category: Categories
  topicId: string
  replyId: string
}

export const useLikeTopicReply = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ category, topicId, replyId }: TopicReplyParams) => {
      await axios.post(
        `/api/topics/${category}/${topicId}/replies/${replyId}/like`
      )
    },
    onSuccess: async () => {
      router.refresh()
    },
  })
}
