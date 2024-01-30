'use server';

import { signUpSchema } from '../_schemas';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/db/user';
import { db } from '@/lib/db';
import { handleError } from '@/lib/utils';

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
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password, nickname } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: 'This email is already registered.',
        },
      };
    }

    await db.user.create({
      data: {
        name: nickname,
        email,
        password: hashedPassword,
      },
    });

    return {
      isSuccess: true,
      message: 'You have successfully signed up.',
    };
  } catch (error) {
    handleError(error);

    return {
      isSuccess: false,
      error: {
        message: 'You have failed to sign up.',
      },
    };
  }
};
