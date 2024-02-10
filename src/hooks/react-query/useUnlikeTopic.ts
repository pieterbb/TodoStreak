import { Categories } from '@/types/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useUnlikeTopic = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({topicId, category }: {
      topicId: string
      category: Categories
    }) => {
      return await axios.delete(`/api/topics/${category}/${topicId}/like`)
    },
    onSuccess: async () => {
      router.refresh()
    },
  })
}
