import { Categories } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type UnlikeTopicReplyParams = {
  category: Categories
  topicId: string
  replyId: string
}

export const useUnlikeTopicReply = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({
      category,
      topicId,
      replyId,
    }: UnlikeTopicReplyParams) => {
      await axios.delete(
        `/api/topics/${category}/${topicId}/replies/${replyId}/like`
      )
    },
    onSuccess: async () => {
      router.refresh()
    },
  })
}
