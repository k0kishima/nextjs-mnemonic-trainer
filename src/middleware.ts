import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { authConfig } from '@/auth.config';
import { defaultLanguage, availableLanguages } from '@/app/i18n/settings';

const getNegotiatedLanguage = (
  headers: Negotiator.Headers,
): string | undefined => {
  return new Negotiator({ headers }).language([...availableLanguages]);
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  };
  const preferredLanguage = getNegotiatedLanguage(headers) || defaultLanguage;

  // auth
  const dashboardRegex = new RegExp(
    `^/(?:${availableLanguages.join('|')}/)?dashboard(/|$)`,
  );
  if (dashboardRegex.test(pathname)) {
    const session = await NextAuth(authConfig).auth();
    if (!session) {
      const signInPath =
        preferredLanguage == defaultLanguage
          ? '/sign-in'
          : `/${preferredLanguage}/sign-in`;
      return NextResponse.redirect(new URL(signInPath, request.url));
    }
  }

  // i18n
  const pathnameIsMissingLocale = availableLanguages.every(
    (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`,
  );

  if (pathnameIsMissingLocale) {
    if (preferredLanguage !== defaultLanguage) {
      return NextResponse.redirect(
        new URL(`/${preferredLanguage}${pathname}`, request.url),
      );
    } else {
      const newPathname = `/${defaultLanguage}${pathname}`;
      return NextResponse.rewrite(new URL(newPathname, request.url));
    }
  }

  return NextResponse.next();
}
