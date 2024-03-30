import { auth } from '@/auth';
import { getExamination, getExaminationWithAnswers } from '@/db/examination';
import { WordList } from './word-list';
import { RememberExaminationButton } from './buttons';
import { t } from 'i18next';
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

  if (examination.answeredAt != null) {
    redirect(`/examinations/${examinationId}/result`);
  }
  if (examination.rememberedAt != null) {
    redirect(`/examinations/${examinationId}/answer`);
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">
        <h1>Please Remember below</h1>
        <WordList words={examination.words} />
      </div>
      <footer className="fixed inset-x-0 bottom-0 border-t p-4">
        <RememberExaminationButton examinationId={examinationId} />
      </footer>
    </div>
  );
}
