import { z } from 'zod';

export const SignInSchema = z.object({
  login: z
    .string()
    .min(2, { message: 'Логин должен быть длиной от 2 символов' }),

  password: z
    .string()
    .min(8, { message: 'Пароль должен быть длиной от 8 символов' }),
});
