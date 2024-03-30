import { auth } from '@/auth';
import { getExamination, getExaminationWithAnswers } from '@/db/examination';
import { t } from 'i18next';
import { Table } from './table';
import { redirect } from 'next/navigation';

/**
 * @package
 */
export async function Container({ examinationId }: { examinationId: string }) {
  const sessionUser = await auth().then((session) => session?.user);
  if (sessionUser == null) {
    throw new Error('No user found');
  }

  const examination = await getExamination(examinationId, sessionUser.id);
  if (examination == null) {
    throw new Error(t('examination_not_found'));
  }

  if (examination.answeredAt == null) {
    redirect(`/examinations/${examinationId}/answer`);
  }

  const data = await getExaminationWithAnswers(examinationId, sessionUser.id);
  if (!data) {
    throw new Error('Data not found');
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">
        <h1>Result</h1>

        <Table data={data} />
      </div>
    </div>
  );
}
