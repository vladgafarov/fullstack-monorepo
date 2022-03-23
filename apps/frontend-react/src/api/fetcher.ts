import { GraphQLClient } from 'graphql-request'
import { client, getCookies } from './client'
import { RefreshTokensQuery } from './queries/refresh-tokens'

const refreshTokens = async (client: GraphQLClient, refreshToken: string) => {
   await client
      .request(RefreshTokensQuery, undefined, {
         authorization: `Bearer ${refreshToken}`,
      })
      .catch(err => console.log(err))
}

export const fetchData = <TData, TVariables>(
   query: string,
   variables?: TVariables,
   options?: RequestInit['headers']
): (() => Promise<TData>) => {
   return async () => {
      let cookies = getCookies()
      let requestHeaders: HeadersInit = {}

      try {
         if (!cookies['access-token'] && cookies['refresh-token']) {
            await refreshTokens(client, cookies['refresh-token'])
         }

         cookies = getCookies()

         if (cookies['access-token']) {
            requestHeaders = {
               authorization: `Bearer ${cookies['access-token']}`,
            }
         }

         const data = await client.request(query, variables, requestHeaders)

         return data
      } catch (err) {
         const parsedError = JSON.parse(JSON.stringify(err))

         const error = parsedError.response.errors[0]

         throw new Error(error.message)
      }

      // const res = await fetch(process.env.REACT_APP_BACKEND_URL, {
      //    method: 'POST',
      //    headers: {
      //       'Content-Type': 'application/json',
      //       ...(options ?? {}),
      //    },
      //    body: JSON.stringify({
      //       query,
      //       variables,
      //    }),
      // })

      // const json = await res.json()

      // if (json.errors) {
      //    const { message } = json.errors[0] || 'Error..'
      //    throw new Error(message)
      // }

      // return json.data
   }
}
