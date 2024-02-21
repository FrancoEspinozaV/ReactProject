import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string({
    required_error: 'title is required',
  }),
  description: z.string({
    required_error: 'description must be a string',
  }),
  date: z.string().datetime().optional(),
})
