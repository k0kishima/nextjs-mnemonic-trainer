import { Container } from './_components';
import { LanguageProvider } from '@/app/i18n/client';

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <LanguageProvider initialLanguage={lang}>
      <Container />;
    </LanguageProvider>
  );
}
