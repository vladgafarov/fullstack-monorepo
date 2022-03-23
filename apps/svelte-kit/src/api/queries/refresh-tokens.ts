import { gql } from 'graphql-request'

export const RefreshTokensQuery = gql`
   {
      refreshTokens {
         access_token
         refresh_token
      }
   }
`
