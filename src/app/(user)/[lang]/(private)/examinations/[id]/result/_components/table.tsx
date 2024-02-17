'use client';

import { ExaminationWithDetails } from '../_types';

export function Table({ data }: { data: ExaminationWithDetails }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Word
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Your Answer
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.words.map(({ word, position }) => {
            const answer = data.answers.find(
              (ans) => ans.position === position,
            );
            const isCorrect = answer?.value === word.name;

            return (
              <tr
                key={word.id}
                className={`${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {word.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {answer?.value || 'No Answer'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
