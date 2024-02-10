import * as z from 'zod'

export type UserSettingsSchema = z.infer<typeof userSettingsSchema>
export const userSettingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z ]*$/, { message: 'Only letters and spaces allowed' })
    .max(50)
    .optional(),
  name: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Only letters and numbers allowed' })
    .max(50),
  image: z.string().max(200, { message: 'Max. 200 characters' }).optional(),
  profileBanner: z
    .string()
    .max(200, { message: 'Max. 200 characters' })
    .optional(),
  bio: z
    .string()
    .trim()
    .max(200, { message: 'Max. 200 characters' })
    .optional(),
  location: z
    .string()
    .trim()
    .max(50, { message: 'Max 50 characters' })
    .optional(),
  twitter: z
    .string()
    .trim()
    .max(30, { message: 'Max 30 characters' })
    .optional(),
})
