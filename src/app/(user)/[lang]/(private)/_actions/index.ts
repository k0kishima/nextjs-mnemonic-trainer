'use server';

import { signOut as authSignOut } from '@/auth';
import { auth } from '@/auth';
import { createExamination } from '@/db/examination';

export type SignOutActionsResult =
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

export const signOut = async (): Promise<SignOutActionsResult> => {
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

export type StartExaminationActionsResult =
  | {
      isSuccess: true;
      message?: {
        info: string;
      };
      examinationId: string;
    }
  | {
      isSuccess: false;
      message: {
        error: string;
      };
    };

export const startExamination = async (
  wordQuantity = 10,
): Promise<StartExaminationActionsResult> => {
  const sessionUser = await auth().then((session) => session?.user);
  if (sessionUser == null) {
    return {
      isSuccess: false,
      message: {
        error: 'Could not obtain credentials.',
      },
    };
  }
  const examination = await createExamination(sessionUser.id, wordQuantity);
  if (examination == null) {
    return {
      isSuccess: false,
      message: {
        error: 'Could not create examination.',
      },
    };
  }

  return {
    isSuccess: true,
    message: {
      info: 'Examination started',
    },
    examinationId: examination.id,
  };
};
