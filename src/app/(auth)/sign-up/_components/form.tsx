'use client';

import { signUp } from '../_actions';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { SignUpButton } from './buttons';
import Input from '@/components/ui/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { signUpSchema } from '../_schemas';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className="mt-2 text-sm text-red-400">{message}</p>;
};

export default function Form() {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    setError('');

    startTransition(async () => {
      const result = await signUp(values);

      if (!result.isSuccess) {
        setError(result.error.message);
        return;
      }

      toast.success(result.message);
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="nickname"
              >
                Nickname
              </label>
              <Input
                id="nickname"
                type="text"
                {...form.register('nickname')}
                placeholder="Enter your nickname"
                Icon={UserCircleIcon}
              />
              <ErrorMessage message={errors.nickname?.message} />
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="Enter your email address"
                Icon={AtSymbolIcon}
              />
              <ErrorMessage message={errors.email?.message} />
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...form.register('password')}
                placeholder="Enter password"
                Icon={KeyIcon}
              />
              <ErrorMessage message={errors.password?.message} />
            </div>
          </div>
          {error && (
            <div className="mt-4 flex items-center justify-center">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <span className="ml-2 text-sm text-red-500">{error}</span>
            </div>
          )}
          <div className="mt-6">
            <SignUpButton type="submit" disabled={isPending} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
