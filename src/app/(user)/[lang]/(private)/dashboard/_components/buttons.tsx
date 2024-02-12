'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/ui/buttons';

export function StartExaminationButton() {
  const buttonClassName = buttonVariants();

  const confirmStartExamination = () => {
    const isConfirmed = window.confirm('試験を開始しますか？');
    if (isConfirmed) {
      startExamination();
    }
  };

  const startExamination = () => {
    console.log('試験を開始します');
  };

  return (
    <button
      onClick={confirmStartExamination}
      className={`${buttonClassName} w-full`}
      type="button"
    >
      Start Examination
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </button>
  );
}
