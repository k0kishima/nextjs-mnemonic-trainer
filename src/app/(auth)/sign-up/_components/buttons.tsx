import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormStatus } from 'react-dom';
import { buttonVariants } from '@/components/ui/buttons';

export function SignUpButton() {
  const { pending } = useFormStatus();
  const buttonClassName = buttonVariants();

  return (
    <button
      className={cn(buttonClassName, 'w-full')}
      disabled={pending}
      type="submit"
    >
      Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </button>
  );
}
