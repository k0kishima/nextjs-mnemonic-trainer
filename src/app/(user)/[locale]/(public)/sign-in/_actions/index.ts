'use server';

import * as z from 'zod';

import { signIn as NextAuthSignIn } from '@/auth';
import { signInSchema } from '@/schemas';
import { getUserByEmail } from '@/db/user';
import { AuthError } from 'next-auth';

const DEFAULT_LOGIN_REDIRECT = '/';

export type ActionsResultWithData<T> =
  | {
      isSuccess: true;
      message: string;
      data: {
        [key: string]: T;
      };
    }
  | {
      isSuccess: false;
      error: {
        message: string;
      };
    };

export const signIn = async (
  values: z.infer<typeof signInSchema>,
): Promise<ActionsResultWithData<boolean>> => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      isSuccess: false,
      error: { message: 'Email address or password is incorrect.' },
    };
  }

  try {
    await NextAuthSignIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      isSuccess: true,
      message: 'Successfully logged in.',
      data: {
        isTwoFactorEnabled: false,
      },
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            error: { message: 'Email address or password is incorrect.' },
          };
        default:
          return {
            isSuccess: false,
            error: {
              message: 'Failed to logged in.',
            },
          };
      }
    }

    throw error;
  }
};
