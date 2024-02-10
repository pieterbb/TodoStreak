import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useDeleteTopic = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({
      topicId,
      category,
    }: {
      topicId: string | undefined
      category: string | undefined
    }) => {
      return await axios.delete(`/api/topics/${category}/${topicId}`)
    },
    onSuccess: async () => {
      router.refresh()
    },
  })
}
