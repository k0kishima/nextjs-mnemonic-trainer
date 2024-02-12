'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from '../_actions';

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const result = await signOut();
  if (result.isSuccess) {
    window.location.href = '/sign-in';
  } else {
    alert(result.message.error);
  }
};

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="relative">
      <button
        onClick={toggleDropdown}
        className={`focus:outline-none ${isOpen ? 'font-bold' : ''}`}
      >
        Menu
        <span
          className={`ml-2 inline-block transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <span className="text-xs">∨</span>
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white text-primary shadow-lg">
          <Link href="/profile">
            <span className="block px-4 py-2 text-sm">Profile</span>
          </Link>
          <form onSubmit={onSubmit}>
            <button
              type="submit"
              className="block w-full px-4 py-2 text-left text-sm"
            >
              Sign Out
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
