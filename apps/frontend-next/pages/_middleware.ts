import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

const NOT_ALLOWED_LINKS = [
   '/profile',
   '/admin',
   '/admin/courses',
   '/admin/users',
   '/admin/reviews',
]
const NOT_ALLOWED_LINKS_LOGGED_IN = ['/login', '/signup', '/reset-password']

const NOT_ALLOWED_LINKS_REDIRECT = '/login'
const NOT_ALLOWED_LINKS_LOGGED_IN_REDIRECT = '/'

export function middleware(req: NextRequest, event: NextFetchEvent) {
   const accessToken = req.cookies['access-token']

   const { name } = req.page

   if (NOT_ALLOWED_LINKS.includes(name) && !accessToken) {
      return NextResponse.redirect(new URL(NOT_ALLOWED_LINKS_REDIRECT, req.url))
   }

   if (NOT_ALLOWED_LINKS_LOGGED_IN.includes(name) && accessToken) {
      return NextResponse.redirect(
         new URL(NOT_ALLOWED_LINKS_LOGGED_IN_REDIRECT, req.url)
      )
   }
}
