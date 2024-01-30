import * as z from 'zod';

export const signUpSchema = z.object({
  email: z.string().email({
    message: 'Email address is required.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  nickname: z.string().min(1, {
    message: 'Nickname is required.',
  }),
});
