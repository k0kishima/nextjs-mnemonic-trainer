import { Examination, ExaminationWord, Word, Answer } from '@prisma/client';

export type ExaminationWithDetails = Examination & {
  words: (ExaminationWord & { word: Word })[];
  answers: Answer[];
};
