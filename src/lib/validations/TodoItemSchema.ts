import { z } from 'zod'

export const todoItemSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: 'Content required' })
    .max(500, { message: 'Max 500 characters' })
    .refine((content) => (content.match(/#/g) || []).length <= 1, {
      message: 'Content can only contain one hashtag',
    }),
  done: z.boolean(),
  attachments: z.array(z.string()).optional().nullable(),
})
