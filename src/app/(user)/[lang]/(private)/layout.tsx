import { Header } from './_components';

export default function Layout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="p-4">
        <div className="mx-auto w-full max-w-[800px] overflow-hidden rounded-lg bg-white">
          {children}
        </div>
      </main>
    </div>
  );
}
