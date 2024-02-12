'use server';

import { signOut as authSignOut } from '@/auth';

export type ActionsResult =
  | {
      isSuccess: true;
      message?: {
        info: string;
      };
    }
  | {
      isSuccess: false;
      message: {
        error: string;
      };
    };

export const signOut = async (): Promise<ActionsResult> => {
  try {
    await authSignOut({ redirect: false });
    return {
      isSuccess: true,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      message: {
        error: 'Error signing out',
      },
    };
  }
};
