'use client';

import React, { useState, useTransition } from 'react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/ui/buttons';
import { answerExaminationAction } from '../_actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Form({ examinationId }: { examinationId: string }) {
  const [isPending, startTransition] = useTransition();
  const [answers, setAnswers] = useState(Array(10).fill(''));
  const router = useRouter();
  const buttonClassName = buttonVariants();

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isConfirmed = window.confirm('Would you like to submit the answers?');
    if (!isConfirmed) {
      return;
    }

    startTransition(async () => {
      const result = await answerExaminationAction(examinationId, answers);
      if (result.isSuccess) {
        toast.success("Let's see the result!");
        router.push(`/examinations/${examinationId}/result`);
      } else {
        alert(result.message.error);
      }
    });
  };

  return (
    <>
      <form id="answerForm" onSubmit={handleSubmit}>
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="mt-2 w-full rounded border p-2"
            placeholder={`Answer #${index + 1}`}
            disabled={isPending}
          />
        ))}
      </form>
      <footer className="mt-4">
        <button
          className={`${buttonClassName} w-full`}
          type="submit"
          form="answerForm"
          disabled={isPending}
        >
          Submit
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
      </footer>
    </>
  );
}
