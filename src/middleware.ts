import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('my-custom-session')?.value || ''

  // accessing public path and you are logged in
  if (isPublicPath && token != '') {
    return NextResponse.redirect(new URL('/profile', request.url))
  }
  // accessing private path and you arent logged in
  if (!isPublicPath && token == '') {
    return NextResponse.redirect(new URL('/signup', request.url))
  }
}

export const config = {
  matcher: [
    // '/',
    '/login',
    '/signup',
    '/profile/:path*',
    // '/profile/todo'
  ]
}