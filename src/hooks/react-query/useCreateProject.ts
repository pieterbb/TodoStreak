'use client'
import { NewProjectSchema } from '@/lib/validations/NewProjectSchema'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useCreateProject = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ formValues }: { formValues: NewProjectSchema }) => {
      return await axios.post('/api/projects', formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },

    onSuccess: async (response) => {
      const project = response?.data?.content
      router.push(`/projects/${project?.slug}`)
    },
  })
}
