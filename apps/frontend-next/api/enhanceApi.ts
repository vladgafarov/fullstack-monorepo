import { api as generatedApi } from '@api/generated'

export const enhanceApi = generatedApi.enhanceEndpoints({
   addTagTypes: ['User', 'Course', 'Review'],
   endpoints: {
      CurrentUser: {
         providesTags: (result, error, arg) => ['User'],
      },
      GetUsers: {
         providesTags: (result, error, arg) => ['User'],
      },
      RemoveUser: {
         invalidatesTags: (result, error, arg) => ['User'],
      },
      LogIn: {
         invalidatesTags: (result, error, arg) => [
            { type: 'User' },
            { type: 'Course', id: 'LIST' },
         ],
      },
      LogOut: {
         invalidatesTags: (result, error, arg) => [
            { type: 'User' },
            { type: 'Course', id: 'LIST' },
         ],
      },
      GetCourses: {
         providesTags: (result, error, arg) =>
            result?.courses
               ? [
                    ...result?.courses?.map(({ id }) => ({
                       type: 'Course' as const,
                       id,
                    })),
                    { type: 'Course', id: 'LIST' },
                 ]
               : [{ type: 'Course', id: 'LIST' }],
      },
      GetCourse: {
         providesTags: (result, error, arg) => [
            { type: 'Course', id: arg.id },
            { type: 'Course', id: 'LIST' },
         ],
      },
      CreateCourse: {
         invalidatesTags: (result, error, arg) => [
            { type: 'Course', id: 'LIST' },
         ],
      },
      RemoveCourse: {
         invalidatesTags: (result, error, arg) => [
            { type: 'Course', id: 'LIST' },
         ],
      },
      SignUpForCourse: {
         invalidatesTags: (result, error, arg) => [
            { type: 'Course', id: 'LIST' },
            { type: 'Course', id: arg.courseId },
            { type: 'User' },
         ],
      },
      SignOutFromCourse: {
         invalidatesTags: (result, error, arg) => [
            { type: 'Course', id: 'LIST' },
            { type: 'Course', id: arg.courseId },
            { type: 'User' },
         ],
      },
      GetReviews: {
         providesTags: (result, error, arg) => ['Review'],
      },
      CreateReview: {
         invalidatesTags: (result, error, arg) => [
            { type: 'Course', id: 'LIST' },
            { type: 'Course', id: arg.courseId },
            { type: 'User' },
         ],
      },
      UpdateReview: {
         invalidatesTags: (result, error, arg) => [
            { type: 'Course', id: result.updateReview.courseId },
            { type: 'User' },
         ],
      },
      DeleteReview: {
         invalidatesTags: (result, error, arg) => [
            { type: 'Course', id: result.removeReview.courseId },
            { type: 'User' },
            'Review',
         ],
      },
   },
})

export * from '@api/generated'
// export const {
//    useCurrentUserQuery,
//    useLazyCurrentUserQuery,
//    useLogInMutation,
// } = enhanceApi
