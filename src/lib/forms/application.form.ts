import { z } from 'zod';

export const applicationForm = z.object({
  lastName: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  handle: z.string(),
  email: z.string().email(),
  role: z
    .string()
    .refine((role) => role === 'factory_owner' || role === 'shop_owner'),
});
