import { createApi } from '@reduxjs/toolkit/query/react'
import { GraphQLClient } from 'graphql-request'
import { graphqlBaseQuery } from './utils'

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL, {
   credentials: 'include',
})

export const api = createApi({
   reducerPath: 'api',
   baseQuery: graphqlBaseQuery({ client }),
   endpoints: builder => ({}),
})
