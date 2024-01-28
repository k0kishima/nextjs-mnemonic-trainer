import { PrimaryButton } from '@/components/ui/buttons';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormStatus } from 'react-dom';

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <PrimaryButton className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </PrimaryButton>
  );
}
