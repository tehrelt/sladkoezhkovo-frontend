import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { ROLES } from './consts/roles.consts';

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const token = cookies.get('accessToken');

  const isAdminPage = url.includes('/admin');
  const isAuthPage = url.includes('/auth');

  if (isAdminPage && !token) {
    console.log('no token');
    return NextResponse.redirect(new URL('/', url));
  }

  if (isAuthPage) {
    if (token) {
      console.log('already logged in');
      return NextResponse.redirect(new URL('/', url));
    }

    return NextResponse.next();
  }

  if (isAdminPage) {
    try {
      const res = await fetch('http://localhost:4200/api/account', {
        headers: { Authorization: `Bearer ${token?.value}` },
      });

      const data = await res.json();

      if (data.role !== ROLES.ADMIN) {
        console.log('not an admin');
        return NextResponse.redirect(new URL('/', url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/auth', url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
