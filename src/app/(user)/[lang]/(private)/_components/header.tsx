import Image from 'next/image';
import Link from 'next/link';
import { DropdownMenu } from './dropdown-menu';

export function Header() {
  return (
    <header className="bg-primary p-4 text-white">
      <div className="mx-auto flex max-w-[800px] items-center justify-between">
        <div>
          <Link href="/dashboard">
            <Image
              src="/logo.png"
              alt="Brain Logo"
              width={50}
              height={50}
              priority
            />
          </Link>
        </div>
        <DropdownMenu />
      </div>
    </header>
  );
}
