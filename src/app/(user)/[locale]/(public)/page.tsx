import Image from 'next/image';
import Link from 'next/link';
import { getTranslations, Locale } from '../_i18n';

export default async function Home({
  params: { locale },
}: Readonly<{
  params: { locale: Locale };
}>) {
  const t = await getTranslations(locale);

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
          {t('login_prompt')}
          <Link
            href="/sign-in"
            className="ml-2 text-primary hover:text-primary-hover hover:underline"
          >
            {t('login_action')}
          </Link>
        </p>
      </div>

      <footer className="mt-10">
        <p className="text-dark-blue">
          &copy; {new Date().getFullYear()}{' '}
          {t('footer_copy', { appName: t('app_name') })}
        </p>
      </footer>
    </main>
  );
}
