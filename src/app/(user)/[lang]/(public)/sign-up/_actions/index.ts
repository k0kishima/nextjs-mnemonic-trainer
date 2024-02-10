'use server';

import { signUpSchema } from '../_schemas';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/db/user';
import { db } from '@/lib/db';
import { handleError } from '@/lib/utils';
import { cookies } from 'next/headers';
import { cookieName, defaultLanguage } from '@/app/i18n/settings';
import { getTranslation } from '@/app/i18n/server';

type ActionsResult =
  | {
      isSuccess: true;
      message: string;
    }
  | {
      isSuccess: false;
      error: {
        message: string;
      };
    };

export const signUp = async (
  values: z.infer<typeof signUpSchema>,
): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const lang = cookieStore.get(cookieName)?.value || defaultLanguage;
  const { t } = await getTranslation(lang);

  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: t('messages.errors.email_already_registered'),
        },
      };
    }

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {
      isSuccess: true,
      message: t('messages.info.successfully_signed_in'),
    };
  } catch (error) {
    handleError(error);

    return {
      isSuccess: false,
      error: {
        message: t('messages.errors.failed_to_signed_up'),
      },
    };
  }
};
