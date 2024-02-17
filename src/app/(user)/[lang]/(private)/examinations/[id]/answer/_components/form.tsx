'use client';

import React, { useState } from 'react';
import { answerExaminationAction } from '../_actions';

export function Form({ examinationId }: { examinationId: string }) {
  const [answers, setAnswers] = useState(Array(10).fill(''));

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await answerExaminationAction(examinationId, answers);
    if (result.isSuccess) {
      window.location.href = '/dashboard';
    } else {
      alert(result.message.error);
    }
  };

  return (
    <form id="answerForm" onSubmit={handleSubmit}>
      {answers.map((answer, index) => (
        <input
          key={index}
          type="text"
          value={answer}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="mt-2 w-full rounded border p-2"
          placeholder={`Answer #${index + 1}`}
        />
      ))}
    </form>
  );
}
