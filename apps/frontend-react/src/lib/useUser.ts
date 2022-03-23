import { client } from '@api/client'
import { useCurrentUserQuery, User } from '@api/generated'
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
   error: string
   isFetching: boolean
}

export const useUser = (params?: UseUserParams): UseUser => {
   const { data, isLoading, error, isFetching } = useCurrentUserQuery(params, {
      keepPreviousData: true,
   })

   // if (isEmpty(data?.currentUser)) {
   //    return {
   //       user: null,
   //    } as UseUser
   // }

   // return data?.currentUser

   return {
      isLoading,
      isFetching,
      user: isEmpty(data?.currentUser)
         ? undefined
         : (data?.currentUser as User),
      error: error as string,
   }
}
