import { z } from 'zod';

export const createPropertyTypeForm = z.object({
  name: z.string().min(2, {
    message: 'Тип собственности должен быть длиной не менее 2 символов',
  }),
});
