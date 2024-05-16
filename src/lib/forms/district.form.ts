import { z } from 'zod';

export const createDistrictForm = z.object({
  name: z.string().min(2, {
    message: 'Название города должно быть длиной не менее 2 символов',
  }),
  cityId: z.string().uuid(),
});
