import * as z from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
  });
