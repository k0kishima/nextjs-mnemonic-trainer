import { db } from '@/lib/db';
import { getRandomWords } from '@/db/word';

export const createExamination = async (userId: string, wordQuantity = 10) => {
  return await db.$transaction(async (tx) => {
    const examination = await tx.examination.create({
      data: {
        userId,
      },
    });

    const wordObjects = await getRandomWords(wordQuantity);
    const examinationWordsData = wordObjects.map((wordObj, index) => ({
      examinationId: examination.id,
      wordId: wordObj.id,
      position: index + 1,
    }));

    await tx.examinationWord.createMany({
      data: examinationWordsData,
    });

    return examination;
  });
};

export const getExamination = async (examinationId: string, userId: string) => {
  return await db.examination.findFirst({
    where: {
      id: examinationId,
      userId: userId,
    },
    include: {
      words: {
        orderBy: {
          position: 'asc',
        },
        include: {
          word: true,
        },
      },
    },
  });
};

export const rememberExamination = async (
  examinationId: string,
  userId: string,
) => {
  return await db.examination.update({
    where: {
      id: examinationId,
      userId: userId,
    },
    data: { rememberedAt: new Date() },
  });
};

export const getExaminationsForUser = async (userId: string) => {
  return await db.examination.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const answerExamination = async (
  examinationId: string,
  userId: string,
  answers: string[],
) => {
  return await db.$transaction(async (tx) => {
    await tx.examination.update({
      where: { id: examinationId, userId },
      data: { answeredAt: new Date() },
    });

    const answersData = answers.map((value, index) => ({
      examinationId,
      value,
      position: index + 1,
    }));

    await tx.answer.createMany({
      data: answersData,
    });
  });
};

export const getExaminationWithAnswers = async (
  examinationId: string,
  userId: string,
) => {
  return await db.examination.findUnique({
    where: { id: examinationId, userId },
    include: {
      words: {
        include: { word: true },
        orderBy: { position: 'asc' },
      },
      answers: { where: { examinationId } },
    },
  });
};
