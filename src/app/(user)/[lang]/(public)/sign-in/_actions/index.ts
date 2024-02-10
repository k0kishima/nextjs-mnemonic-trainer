'use server';

import * as z from 'zod';

import { signIn as NextAuthSignIn } from '@/auth';
import { signInSchema } from '@/schemas';
import { getUserByEmail } from '@/db/user';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers';
import { cookieName, defaultLanguage } from '@/app/i18n/settings';
import { getTranslation } from '@/app/i18n/server';

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
  const cookieStore = cookies();
  const lang = cookieStore.get(cookieName)?.value || defaultLanguage;
  const { t } = await getTranslation(lang);

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
      error: { message: t('messages.errors.invalid_credential') },
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
      message: t('messages.info.successfully_logged_in'),
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
            error: { message: t('messages.errors.invalid_credential') },
          };
        default:
          return {
            isSuccess: false,
            error: {
              message: t('messages.errors.failed_to_logged_in'),
            },
          };
      }
    }

    throw error;
  }
};
