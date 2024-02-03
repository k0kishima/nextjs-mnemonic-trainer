import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary">記憶術訓練アプリ</h1>
        <p className="mt-2 text-lg text-secondary">
          毎日の記憶力向上のための練習
        </p>
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
      </div>

      <footer className="mt-10">
        <p className="text-secondary">
          &copy; {new Date().getFullYear()} 記憶術訓練アプリ. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
