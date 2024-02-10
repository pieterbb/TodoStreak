import { z } from 'zod'

export type EditProjectSchema = z.infer<typeof editProjectSchema>
export const editProjectSchema = z.object({
  hashtag: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/, {
      message: 'Only letters and underscores allowed',
    })
    .min(1, { message: 'Required' })
    .max(20),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Required' })
    .regex(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, {
      message: 'Only letters, numbers and spaces allowed',
    })
    .max(50),
  pitch: z.string().trim().max(200),
  website: z.string().url().or(z.literal('')).nullable(),
  avatar: z
    .string()
    .url({ message: 'Must be a valid URL. Ex. https://google.com' })
    .or(z.literal(''))
    .nullable(),
  profileBanner: z
    .string()
    .url({ message: 'Must be a valid URL. Ex. https://google.com' })
    .or(z.literal(''))
    .nullable(),
  id: z.string(),
  status: z.enum(['active', 'archived']),
  twitter: z
    .string()
    .trim()
    .max(30, { message: 'Max 30 characters' })
    .or(z.literal(''))
    .nullable(),
})
