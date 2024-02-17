'use server';

import { getExamination, answerExamination } from '@/db/examination';
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

export const answerExaminationAction = async (
  examinationId: string,
  answers: string[],
): Promise<ActionsResult> => {
  const sessionUser = await auth().then((session) => session?.user);
  if (!sessionUser) {
    return {
      isSuccess: false,
      message: {
        error: 'Could not obtain credentials.',
      },
    };
  }

  const examination = await getExamination(examinationId, sessionUser.id);
  if (!examination) {
    return {
      isSuccess: false,
      message: {
        error: 'Examination not found',
      },
    };
  }

  await answerExamination(examinationId, sessionUser.id, answers);

  return {
    isSuccess: true,
    message: {
      info: 'The answer has been submitted successfully.',
    },
  };
};
