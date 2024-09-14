import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req:any) {
  const localCookie = req.cookies.has("__Secure-next-auth.session-token")
  const vercelCookie = req.cookies.has("next-auth.session-token")
  const isLogin = localCookie || vercelCookie
  if (!isLogin) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/"],
};
