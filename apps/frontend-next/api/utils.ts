import { DocumentNode } from 'graphql'
import { ClientError, GraphQLClient } from 'graphql-request'
import { RefreshTokensQuery } from './queries/refresh-tokens'

const refreshTokens = async (client: GraphQLClient, cookies: {}) => {
   await client
      .request(RefreshTokensQuery, undefined, {
         authorization: `Bearer ${cookies['refresh-token']}`,
      })
      .catch(err => console.log(err))
}

const getCookies = () => {
   return Object.fromEntries(
      document.cookie.split('; ').map(c => {
         const [key, ...v] = c.split('=')
         return [key, v.join('=')]
      })
   )
}

export const graphqlBaseQuery =
   ({ client }: { client: GraphQLClient }) =>
   async ({
      document: query,
      variables,
   }: {
      document: string | DocumentNode
      variables?: any
   }) => {
      let cookies = getCookies()
      let requestHeaders: HeadersInit = {}

      try {
         if (!cookies['access-token'] && cookies['refresh-token']) {
            await refreshTokens(client, cookies)
         }

         //update cookies after refresh
         cookies = getCookies()

         if (cookies['access-token']) {
            requestHeaders = {
               authorization: `Bearer ${cookies['access-token']}`,
            }
         }

         const result = await client.request(query, variables, requestHeaders)
         return { data: result }
      } catch (error) {
         if (error instanceof ClientError) {
            const parsedError =
               error.response.errors[0].message ??
               error.response.errors[0].extensions.response ??
               error.response.errors[0].extensions.exception

            if (
               (parsedError.statusCode === 401 ||
                  parsedError.message === 'jwt expired') &&
               cookies['refresh-token']
            ) {
               await refreshTokens(client, cookies)
            }

            return { error: parsedError ?? error }
         }
         return { error: { status: 500, data: error } }
      }
   }
