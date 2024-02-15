import React from 'react';
import { ExaminationWord, Word } from '@prisma/client';

type ExaminationWordWithWord = ExaminationWord & {
  word: Word;
};

type WordListProps = {
  words: ExaminationWordWithWord[];
};

/**
 * @package
 */
export const WordList: React.FC<WordListProps> = ({ words }) => {
  return (
    <div className="mx-auto mt-8 max-w-md">
      <ul className="divide-y divide-gray-200">
        {words.map((item) => (
          <li
            key={item.wordId}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center">
              <span className="text-sm font-medium text-secondary">
                {item.position}.
              </span>
              <span className="ml-3 text-lg font-semibold text-secondary">
                {item.word.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
