'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/ui/buttons';
import { rememberExaminationAction } from '../_actions';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
 * @package
 */
export const RememberExaminationButton = ({
  examinationId,
}: {
  examinationId: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const buttonClassName = buttonVariants();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = window.confirm('Did you remember?');
    if (!isConfirmed) {
      return;
    }

    startTransition(async () => {
      const result = await rememberExaminationAction(examinationId);

      if (result.isSuccess) {
        toast.success('Answer later!');
        router.push(`/dashboard`);
      } else {
        alert(result.message.error);
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <button
        className={`${buttonClassName} w-full`}
        disabled={isPending}
        type="submit"
      >
        I Remembered
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
    </form>
  );
};
