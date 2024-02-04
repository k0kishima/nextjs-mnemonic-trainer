import { cn } from '@/lib/utils';
import { signOut } from '@/auth';
import { buttonVariants } from '@/components/ui/buttons';

const buttonClassName = buttonVariants();

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className={cn(buttonClassName)} type="submit">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
