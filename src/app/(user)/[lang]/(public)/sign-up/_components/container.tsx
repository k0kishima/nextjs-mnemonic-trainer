'use client';

import { Form } from './form';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, useTranslation } from '@/app/i18n/client';

/**
 * @package
 */
export function Container() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">
          <div className="w-32 text-primary-foreground md:w-36">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Brain Logo"
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>
        </div>
        <Form />
        <div className="text-center text-sm text-secondary">
          <p>
            {t('sign_in_prompt')}
            <Link
              href="/sign-in"
              className="ml-2 text-primary hover:text-primary-hover hover:underline"
            >
              {t('sign_in_action')}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
