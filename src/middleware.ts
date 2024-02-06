import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { NextRequest, NextResponse } from 'next/server';
import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  extractLocale,
} from '@/app/(user)/[locale]/_i18n';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  };
  const locale = extractLocale(headers);

  // auth
  const dashboardRegex = new RegExp(
    `^/(?:${AVAILABLE_LOCALES.join('|')}/)?dashboard(/|$)`,
  );
  if (dashboardRegex.test(pathname)) {
    const session = await NextAuth(authConfig).auth();
    if (!session) {
      const signInPath =
        locale == DEFAULT_LOCALE ? '/sign-in' : `/${locale}/sign-in`;
      return NextResponse.redirect(new URL(signInPath, request.url));
    }
  }

  // i18n
  const pathnameIsMissingLocale = AVAILABLE_LOCALES.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    if (locale !== DEFAULT_LOCALE) {
      return NextResponse.redirect(
        new URL(`/${locale}/${pathname}`, request.url),
      );
    } else {
      const newPathname = `/${DEFAULT_LOCALE}${pathname}`;
      return NextResponse.rewrite(new URL(newPathname, request.url));
    }
  }
}
