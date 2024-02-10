import { z } from 'zod'

export type NewProjectSchema = z.infer<typeof newProjectSchema>
export const newProjectSchema = z.object({
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
  slug: z
    .string()
    .trim()
    .min(1, { message: 'Required' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Only letters and numbers allowed' })
    .max(20),
  pitch: z.string().trim().max(200),
  website: z
    .string()
    .url({ message: 'Must be a valid URL. Ex. https://google.com' })
    .optional()
    .or(z.literal('')),
  avatar: z
    .string()
    .url({ message: 'Must be a valid URL. Ex. https://google.com' })
    .optional()
    .or(z.literal('')),
  profileBanner: z
    .string()
    .url({ message: 'Must be a valid URL. Ex. https://google.com' })
    .optional()
    .or(z.literal('')),

  status: z.enum(['active', 'archived']).optional(),
  twitter: z
    .string()
    .trim()
    .max(30, { message: 'Max 30 characters' })
    .optional(),
})
