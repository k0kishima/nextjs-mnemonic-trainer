import { auth } from '@/auth';
import { getExamination } from '@/db/examination';
import { t } from 'i18next';
import { Form } from './form';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/ui/buttons';

/**
 * @package
 */
export async function Container({ examinationId }: { examinationId: string }) {
  const buttonClassName = buttonVariants();

  const sessionUser = await auth().then((session) => session?.user);
  if (sessionUser == null) {
    throw new Error('No user found');
  }

  const examination = await getExamination(examinationId, sessionUser.id);
  if (examination == null) {
    throw new Error(t('examination_not_found'));
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">
        <h1>Please Submit Answer</h1>
        <Form examinationId={examinationId} />
      </div>
      <footer className="fixed inset-x-0 bottom-0 border-t p-4">
        <button
          className={`${buttonClassName} w-full`}
          type="submit"
          form="answerForm"
        >
          Submit
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
      </footer>
    </div>
  );
}
