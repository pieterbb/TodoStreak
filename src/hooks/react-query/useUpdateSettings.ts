import { UserSettingsSchema } from '@/lib/validations/UserSettingsSchema'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useUpdateSettings = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ formValues }: { formValues: UserSettingsSchema }) => {
      return await axios.post(`/api/settings/`, formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: async () => {
      toast.success('Settings saved!')
      router.refresh()
    },
  })
}
