import { z } from 'zod'

export const topicReplySchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: 'Content required' })
    .max(1000, { message: 'Max 1000 characters' }),
})
