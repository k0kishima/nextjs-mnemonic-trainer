import { getRandomWords } from '@/db/word';
import { Word } from '@prisma/client';

export default async function Page() {
  const words = await getRandomWords(10);

  return (
    <div>
      <h1>Random Words</h1>
      <ul>
        {words.map((word: Word) => (
          <li key={word.id}>{word.name}</li>
        ))}
      </ul>
    </div>
  );
}
