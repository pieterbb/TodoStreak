import { z } from 'zod'

export const newTopicItem = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Required' })
    .max(100, { message: 'Max 100 characters' }),
  content: z.string().trim().min(1, { message: 'Required' }),
  category: z.enum(['questions', 'milestones', 'roasts']).optional(),
})
