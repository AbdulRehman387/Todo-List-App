import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req:any) {
  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({ req, secret });
  console.log(token);
  
  
  if (!token) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/"],
};
