'use server';

import { rememberExamination } from '@/db/examination';
import { auth } from '@/auth';
import { getUserByEmail } from '@/db/user';

type ActionsResult =
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

export const rememberExaminationAction = async (
  examinationId: string,
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
  const examination = await rememberExamination(examinationId, user.id);

  return {
    isSuccess: true,
    message: {
      info: 'Examination remembered',
    },
  };
};
