import { auth } from '@/auth';
import { getExaminationWithAnswers } from '@/db/examination';
import { Table } from './table';

/**
 * @package
 */
export async function Container({ examinationId }: { examinationId: string }) {
  const sessionUser = await auth().then((session) => session?.user);
  if (sessionUser == null) {
    throw new Error('No user found');
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
