import { db } from '@/lib/db';
import { handleDatabaseOperation } from './utils';

const getRandomIds = (max: number, n: number) => {
  const ids = new Set<number>();
  while (ids.size < n) {
    const id = Math.floor(Math.random() * max) + 1;
    ids.add(id);
  }
  return Array.from(ids);
};

export const getRandomWords = async (n: number) => {
  return handleDatabaseOperation(async () => {
    const totalWords = await db.word.count();
    if (totalWords === 0) {
      throw new Error('No words available');
    }
    const randomIds = getRandomIds(totalWords, n);
    return await db.word.findMany({
      where: {
        id: {
          in: randomIds,
        },
      },
    });
  });
};
