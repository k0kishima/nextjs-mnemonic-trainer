import Image from 'next/image';
import Link from 'next/link';
import { getTranslation } from '@/app/i18n/server';
import { LanguageSwitcher } from '../_components/';

export default async function Home({
  params: { lang },
}: Readonly<{
  params: { lang: string };
}>) {
  const { t } = await getTranslation(lang);

  return (
    <main className="bg-soft-red flex min-h-screen flex-col items-center justify-center p-4">
      <header className="text-center">
        <h1 className="text-medium-blue text-4xl font-bold">{t('app_name')}</h1>
        <p className="text-dark-blue mt-2 text-lg">{t('catch_copy')}</p>
      </header>

      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="mb-5">
          <Image
            src="/logo.png"
            alt="Brain Logo"
            width={100}
            height={100}
            priority
          />
        </div>
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

      <footer className="mt-10 flex w-full flex-col items-center justify-between p-4 sm:flex-row sm:items-start sm:justify-center">
        <p className="mb-4 text-center text-secondary sm:mb-0 sm:mr-4 sm:text-left">
          {t('footer_copy', {
            year: new Date().getFullYear(),
            appName: t('app_name'),
          })}
        </p>
        <LanguageSwitcher currentLanguage={lang} />
      </footer>
    </main>
  );
}
