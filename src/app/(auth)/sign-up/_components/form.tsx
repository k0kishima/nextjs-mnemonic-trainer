'use client';

//import { authenticate } from '../actions';
const authenticate = () => {
  return false;
};
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { LoginButton } from './buttons';
import { useFormState } from 'react-dom';
import { InputWithIcon } from '@/components/ui/inputs';

export default function Form() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="nickname"
            >
              Nickname
            </label>
            <InputWithIcon
              id="nickname"
              type="text"
              name="nickname"
              placeholder="Enter your nickname"
              required
              Icon={UserCircleIcon}
            />
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <InputWithIcon
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              Icon={AtSymbolIcon}
            />
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <InputWithIcon
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
              Icon={KeyIcon}
            />
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
