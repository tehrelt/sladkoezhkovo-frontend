import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const token = cookies.get('accessToken');

  const isAdminPage = url.includes('/admin');
  const isAuthPage = url.includes('/auth');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/', url));
    }

    return NextResponse.next();
  }

  if (isAdminPage && !token) {
    return { notFound: true };
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
