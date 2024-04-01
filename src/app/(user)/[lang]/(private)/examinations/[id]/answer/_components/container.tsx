import { auth } from '@/auth';
import { getExamination } from '@/db/examination';
import { t } from 'i18next';
import { Form } from './form';
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

  if (examination.rememberedAt == null) {
    redirect(`/examinations/${examinationId}/memorize`);
  }
  if (examination.answeredAt != null) {
    redirect(`/examinations/${examinationId}/result`);
  }

  return (
    <div className="flex h-screen flex-col">
      <Form examinationId={examinationId} />
    </div>
  );
}
