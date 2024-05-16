import { z } from 'zod';

export const createUnitForm = z.object({
  name: z.string(),
});
