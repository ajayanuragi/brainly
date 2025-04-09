import {z} from 'zod'
export const contentSchema = z.object({
    type: z.enum(['document', 'tweet', 'youtube', 'link']),
    link: z.string().url(),
    title: z.string().max(200),
    tags: z.array(z.string()).max(10).optional()
  });