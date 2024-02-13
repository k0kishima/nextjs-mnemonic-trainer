'use server';

import { signOut as authSignOut } from '@/auth';
import { auth } from '@/auth';
import { getUserByEmail } from '@/db/user';
import { createExamination } from '@/db/examination';

export type ActionsResult =
  | {
      isSuccess: true;
      message?: {
        info: string;
      };
    }
  | {
      isSuccess: false;
      message: {
        error: string;
      };
    };

export const signOut = async (): Promise<ActionsResult> => {
  try {
    await authSignOut({ redirect: false });
    return {
      isSuccess: true,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: {
        error: 'Error signing out',
      },
    };
  }
};

export const startExamination = async (
  wordQuantity = 10,
): Promise<ActionsResult> => {
  const sessionUser = await auth().then((session) => session?.user);
  if (!sessionUser?.email) {
    return {
      isSuccess: false,
      message: {
        error: 'Could not obtain credentials.',
      },
    };
  }
  const user = await getUserByEmail(sessionUser.email);
  if (!user) {
    return {
      isSuccess: false,
      message: {
        error: 'User not found.',
      },
    };
  }
  const examination = await createExamination(user.id);

  console.log(examination);

  return {
    isSuccess: true,
    message: {
      info: 'Examination started',
    },
  };
};
