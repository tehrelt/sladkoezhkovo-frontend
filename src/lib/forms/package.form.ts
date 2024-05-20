import { z } from 'zod';

export const createPackageForm = z.object({
  name: z.string().min(2, {
    message: 'Название  быть длиной не менее 2 символов',
  }),
  unitId: z.string().uuid(),
});
