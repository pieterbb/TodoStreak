'use client'
import { EditProjectSchema } from '@/lib/validations/EditProjectSchema'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useEditProject = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ formValues }: { formValues: EditProjectSchema }) => {
      return await axios.put('/api/projects', formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: async () => {
      toast.success('Project settings saved!')
      router.refresh()
    },
  })
}
