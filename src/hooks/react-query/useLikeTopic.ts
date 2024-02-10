import { Categories } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useLikeTopic = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({
      topicId,
      category,
    }: {
      topicId: string
      category: Categories
    }) => {
      return await axios.post(`/api/topics/${category}/${topicId}/like`)
    },
    onSuccess: async () => {
      router.refresh()
    },
  })
}
