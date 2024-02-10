'use client';

import { cn } from '@/lib/utils';
import { signIn } from '../_actions';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Input from '@/components/ui/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { signInSchema } from '@/schemas';
import { buttonVariants } from '@/components/ui/buttons';
import { useLanguage, useTranslation, z } from '@/app/i18n/client';

const buttonClassName = buttonVariants();

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className="mt-2 text-sm text-destructive">{message}</p>;
};

/**
 * @package
 */
export function Form() {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setError('');

    startTransition(async () => {
      const result = await signIn(values);

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
          <h1 className="mb-3 text-2xl">{t('sign-in:sign_in_prompt')}</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                {t('email')}
              </label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder={t('messages.info.enter_email')}
                Icon={AtSymbolIcon}
              />
              <ErrorMessage message={errors.email?.message} />
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                {t('password')}
              </label>
              <Input
                id="password"
                type="password"
                {...form.register('password')}
                placeholder={t('messages.info.enter_password')}
                Icon={KeyIcon}
              />
              <ErrorMessage message={errors.password?.message} />
            </div>
          </div>
          {error && (
            <div className="mt-4 flex items-center justify-center">
              <ExclamationCircleIcon className="h-5 w-5 text-destructive" />
              <span className="ml-2 text-sm text-destructive">{error}</span>
            </div>
          )}
          <div className="mt-6">
            <button
              className={cn(buttonClassName, 'w-full')}
              disabled={isPending}
              type="submit"
            >
              {t('sign-in:submit')}
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
