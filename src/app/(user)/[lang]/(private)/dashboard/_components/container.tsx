import { auth } from '@/auth';
import { StartExaminationButton } from './buttons';
import { ExaminationList } from './examination-list';

/**
 * @package
 */
export async function Container() {
  const sessionUser = await auth().then((session) => session?.user);
  if (sessionUser == null) {
    throw new Error('No user found');
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">
        <ExaminationList userId={sessionUser.id} />
      </div>
      <footer className="fixed inset-x-0 bottom-0 border-t p-4">
        <StartExaminationButton />
      </footer>
    </div>
  );
}
