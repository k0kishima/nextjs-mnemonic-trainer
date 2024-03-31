import Link from 'next/link';
import { getExaminationsForUser } from '@/db/examination';
import { format } from '@/lib/date';
import { getExaminationStatus } from '@/models/examination';
import { Examination } from '@prisma/client';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export const ExaminationList = async ({ userId }: { userId: string }) => {
  const examinations = (await getExaminationsForUser(userId)) || [];

  const getLinkPath = (exam: Examination) => {
    const status = getExaminationStatus(exam);
    switch (status) {
      case 'NotStarted':
        return `/examinations/${exam.id}/memorize`;
      case 'AwaitingResponse':
        return `/examinations/${exam.id}/answer`;
      case 'Completed':
        return `/examinations/${exam.id}/result`;
      default:
        return '#';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Started
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Remembered
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Answered
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {examinations.map((exam) => (
            <tr key={exam.id} className="hover:bg-secondary-foreground">
              <td className="whitespace-nowrap">
                <Link href={getLinkPath(exam)}>
                  <div className="w-full px-6 py-4">
                    {format(exam.createdAt, dateFormatOptions)}
                  </div>
                </Link>
              </td>
              <td className="whitespace-nowrap">
                <Link href={getLinkPath(exam)}>
                  <div className="w-full px-6 py-4">
                    {exam.rememberedAt
                      ? format(new Date(exam.rememberedAt), dateFormatOptions)
                      : 'N/A'}
                  </div>
                </Link>
              </td>
              <td className="whitespace-nowrap">
                <Link href={getLinkPath(exam)}>
                  <div className="w-full px-6 py-4">
                    {exam.answeredAt
                      ? format(new Date(exam.answeredAt), dateFormatOptions)
                      : 'N/A'}
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
