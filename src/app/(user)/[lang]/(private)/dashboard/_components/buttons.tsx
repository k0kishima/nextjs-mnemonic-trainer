'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/ui/buttons';
import { startExamination } from '../../_actions';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
 * @package
 */
export function StartExaminationButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const buttonClassName = buttonVariants();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = window.confirm('Would you like to start the test?');
    if (!isConfirmed) {
      return;
    }

    startTransition(async () => {
      const result = await startExamination();

      if (result.isSuccess) {
        toast.success('Examination started successfully!');
        router.push(`/examinations/${result.examinationId}/memorize`);
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
        Start Examination
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
    </form>
  );
}
