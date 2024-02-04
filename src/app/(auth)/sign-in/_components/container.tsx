import { Form } from './form';
import Link from 'next/link';

/**
 * @package
 */
export function Container() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">
          <div className="w-32 text-primary-foreground md:w-36"></div>
        </div>
        <Form />
        <div className="text-center text-sm text-secondary">
          <p>
            Don&apos;t have an account?
            <Link
              href="/sign-up"
              className="ml-2 text-primary hover:text-primary-hover hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
