import { db } from '@/lib/db';

const getRandomIds = (max: number, n: number) => {
  const ids = new Set<number>();
  while (ids.size < n) {
    const id = Math.floor(Math.random() * max) + 1;
    ids.add(id);
  }
  return Array.from(ids);
};

// TODO: 単語がない場合はエラーとする
export const getRandomWords = async (n: number) => {
  const totalWords = await db.word.count();
  const randomIds = getRandomIds(totalWords, n);
  return await db.word.findMany({
    where: {
      id: {
        in: randomIds,
      },
    },
  });
};
