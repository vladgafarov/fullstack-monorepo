// import { client } from '@api/api'
import { CurrentUser } from '@api/queries/current-user'
import { GraphQLClient } from 'graphql-request'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL, {
   credentials: 'include',
   fetch,
})

export async function middleware(req: NextRequest, event: NextFetchEvent) {
   const cookies = req.cookies
   const { name } = req.page
   let currentUser

   try {
      const user = await client.request(CurrentUser, undefined, {
         authorization: `Bearer ${cookies['access-token']}`,
      })

      currentUser = user.currentUser
   } catch (error) {
      console.log(error)
   }

   if (currentUser && currentUser.role === 'ADMIN') {
      if (name === '/admin') {
         return NextResponse.redirect(new URL('/admin/courses', req.url))
      }
      return NextResponse.next()
   }

   return NextResponse.redirect(new URL('/404', req.url))
}
