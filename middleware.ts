import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req:any) {
  // Extract token from the request using next-auth's getToken
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: '/', // This will apply the middleware to all routes under /protected
};
