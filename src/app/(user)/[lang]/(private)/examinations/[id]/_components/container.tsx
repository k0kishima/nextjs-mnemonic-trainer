import { auth } from '@/auth';
import { getUserByEmail } from '@/db/user';
import { getExamination } from '@/db/examination';
import { WordList } from './word-list';
import { RememberExaminationButton } from './buttons';
import { t } from 'i18next';

/**
 * @package
 */
export async function Container({ examinationId }: { examinationId: string }) {
  const sessionUser = await auth().then((session) => session?.user);
  if (!sessionUser?.email) {
    throw new Error('No user found');
  }
  const user = await getUserByEmail(sessionUser.email);
  if (!user) {
    throw new Error('No user found');
  }

  const examination = await getExamination(examinationId, user.id);
  if (examination == null) {
    throw new Error(t('examination_not_found'));
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">
        <h1>Examination</h1>
        <WordList words={examination.words} />
      </div>
      <footer className="fixed inset-x-0 bottom-0 border-t p-4">
        <RememberExaminationButton examinationId={examinationId} />
      </footer>
    </div>
  );
}
