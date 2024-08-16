import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://www.sitename.com', 'https://sitename.com']
  : ['http://localhost:3000', 'https://www.google.com', 'localhost:3000']

export function middleware(request: NextRequest) {
  // block any non same site api requests
  // const origin = request.headers.get('origin')
  // if (origin && !allowedOrigins.includes(origin) || !origin) {
  //   return new NextResponse(null, {
  //     status: 400,
  //     statusText: "Bad Request",
  //     headers: {
  //       'Content-Type': 'text/plain'
  //     }
  //   })
  // }


  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'

  const isApiPath = path.startsWith('/api/')
  const isApiAuthPath = path === '/api/users/login' || path === '/api/users/signup';

  const token = request.cookies.get('my-custom-session')?.value || ''

  // Ignore the middleware for /profile/verifyEmail
  if (path.startsWith('/profile/verifyEmail')) {
    return NextResponse.next();
  }

  // accessing public path and you are logged in
  if (isPublicPath && token != '') {
    return NextResponse.redirect(new URL('/profile', request.url))
  }
  // accessing private path and you arent logged in
  if (!isPublicPath && token == '') {
    return NextResponse.redirect(new URL('/signup', request.url))
  }
  // make sure that anybody who accesses api routes have a token
  // if (isApiPath && !token && !isApiAuthPath) {
  //   return new NextResponse('Unauthorized', { status: 403 });
  // }


}

export const config = {
  matcher: [
    // '/',
    '/login',
    '/signup',
    '/profile/:path*',
    // '/profile/todo'
    // '/api/:path*',
  ]
}