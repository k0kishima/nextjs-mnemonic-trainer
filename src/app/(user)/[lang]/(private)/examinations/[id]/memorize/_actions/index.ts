'use server';

import { rememberExamination } from '@/db/examination';
import { auth } from '@/auth';

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
  if (sessionUser == null) {
    return {
      isSuccess: false,
      message: {
        error: 'Could not obtain credentials.',
      },
    };
  }
  await rememberExamination(examinationId, sessionUser.id);

  return {
    isSuccess: true,
    message: {
      info: 'Examination remembered',
    },
  };
};
