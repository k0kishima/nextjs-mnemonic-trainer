import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-soft-red flex min-h-screen flex-col items-center justify-center p-4">
      <header className="text-center">
        <h1 className="text-medium-blue text-4xl font-bold">
          記憶術訓練アプリ
        </h1>
        <p className="text-dark-blue mt-2 text-lg">
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
        <p>
          Do you have an account?
          <Link
            href="/sign-in"
            className="ml-2 text-primary hover:text-primary-hover hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      <footer className="mt-10">
        <p className="text-dark-blue">
          &copy; {new Date().getFullYear()} 記憶術訓練アプリ. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
