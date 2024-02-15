import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { getUserByEmail } from './db/user';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  callbacks: {
    async session({ session }) {
      if (session.user.email == null) {
        throw new Error('No user found');
      }
      const user = await getUserByEmail(session.user.email);
      if (user == null) {
        throw new Error('No user found');
      }
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
