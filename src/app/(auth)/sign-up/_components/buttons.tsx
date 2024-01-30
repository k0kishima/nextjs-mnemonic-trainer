import { PrimaryButton } from '@/components/ui/buttons';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormStatus } from 'react-dom';
import { ButtonHTMLAttributes } from 'react';

export function SignUpButton({
  type,
  disabled,
}: {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <PrimaryButton
      className="mt-4 w-full"
      aria-disabled={pending || disabled}
      type={type}
    >
      Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </PrimaryButton>
  );
}
