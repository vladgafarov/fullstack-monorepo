import { gql } from 'graphql-request'

export const CurrentUser = gql`
   query CurrentUser {
      currentUser {
         ... on User {
            id
            email
            name
            lastName
            role
         }
      }
   }
`
