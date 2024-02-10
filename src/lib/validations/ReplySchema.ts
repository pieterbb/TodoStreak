import { z } from 'zod'

export const replySchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Required' })
    .max(400, { message: 'Max 400 characters' }),
})
