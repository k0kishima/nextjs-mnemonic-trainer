import { db } from '@/lib/db';
import { handleDatabaseOperation } from './utils';

export const getUserByEmail = async (email: string) => {
  return handleDatabaseOperation(() =>
    db.user.findUnique({ where: { email } }),
  );
};

export const getUserById = async (id: string) => {
  return handleDatabaseOperation(() => db.user.findUnique({ where: { id } }));
};
