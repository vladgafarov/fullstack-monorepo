import { GraphQLClient } from 'graphql-request'

export const getCookies = () => {
   return Object.fromEntries(
      document.cookie.split('; ').map(c => {
         const [key, ...v] = c.split('=')
         return [key, v.join('=')]
      })
   )
}

export const client = new GraphQLClient(process.env.REACT_APP_BACKEND_URL, {
   credentials: 'include',
   mode: 'cors',
})
