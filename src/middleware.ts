import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { AccessTokenService } from './services/access-token';
import { toast } from 'sonner';

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const token = cookies.get('refreshToken');

  const isAdminPage = url.includes('/admin');
  const isAuthPage = url.includes('/auth');

  if (isAuthPage) {
    if (token) {
      toast('Вы уже авторизованы');
      return NextResponse.redirect('/');
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
