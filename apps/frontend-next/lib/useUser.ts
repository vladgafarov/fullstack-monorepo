import { useCurrentUserQuery } from '@api/enhanceApi'
import { User } from '@api/enhanceApi'
import { SerializedError } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

interface UseUserParams {
   skipCourses?: number
   takeCourses?: number
   skipReviews?: number
   takeReviews?: number
}

interface UseUser {
   user: User
   isLoading: boolean
   error: SerializedError
   isFetching: boolean
}

export const useUser = (params?: UseUserParams): UseUser => {
   const { data, isLoading, error, isFetching } = useCurrentUserQuery(params)

   if (isEmpty(data?.currentUser)) {
      return {
         user: undefined,
      } as UseUser
   }

   return {
      user: data?.currentUser as User,
      isLoading,
      error,
      isFetching,
   }
}
