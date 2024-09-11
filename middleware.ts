import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
