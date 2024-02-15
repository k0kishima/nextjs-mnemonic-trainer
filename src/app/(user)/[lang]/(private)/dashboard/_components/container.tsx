import { auth } from '@/auth';
import { StartExaminationButton } from './buttons';
import { getUserByEmail } from '@/db/user';
import { ExaminationList } from './examination-list';

/**
 * @package
 */
export async function Container() {
  const sessionUser = await auth().then((session) => session?.user);
  if (!sessionUser?.email) {
    throw new Error('No user found');
  }
  const user = await getUserByEmail(sessionUser.email);
  if (!user) {
    throw new Error('No user found');
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">
        <ExaminationList userId={user.id} />
      </div>
      <footer className="fixed inset-x-0 bottom-0 border-t p-4">
        <StartExaminationButton />
      </footer>
    </div>
  );
}
