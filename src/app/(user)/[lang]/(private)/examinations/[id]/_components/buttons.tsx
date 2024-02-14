'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/ui/buttons';
import { rememberExaminationAction } from '../_actions';

export const RememberExaminationButton = ({
  examinationId,
}: {
  examinationId: string;
}) => {
  const buttonClassName = buttonVariants();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await rememberExaminationAction(examinationId);
    if (result.isSuccess) {
      window.location.href = '/dashboard';
    } else {
      alert(result.message.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className={`${buttonClassName} w-full`} type="submit">
        I Remembered
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
    </form>
  );
};
