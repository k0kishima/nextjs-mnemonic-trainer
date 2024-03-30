import { Prisma } from '@prisma/client';
import { DatabaseConnectionError } from './errors';

export const handleDatabaseOperation = async <T>(
  operation: () => Promise<T>,
): Promise<T | null> => {
  try {
    return await operation();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      (error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P1001')
    ) {
      throw new DatabaseConnectionError('Database connection error');
    }
    return null;
  }
};
