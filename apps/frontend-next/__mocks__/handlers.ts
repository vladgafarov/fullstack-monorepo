import { graphql } from 'msw'
import {
   CurrentUserQuery,
   GetCoursesQuery,
   GetCoursesQueryVariables,
} from '@api/generated'

export const handlers = [
   graphql.query<GetCoursesQuery, GetCoursesQueryVariables>(
      'GetCourses',
      (req, res, ctx) => {
         return res(
            ctx.data({
               __typename: 'Query',
               courses: [
                  {
                     __typename: 'Course',
                     id: 40,
                     title: 'fhdgd',
                     description: 'gdfgdfg',
                     price: 145,
                     discount: null,
                     currentUser: null,
                     count: 31,
                     mainImage:
                        'http://res.cloudinary.com/sickfits1234554321/image/upload/v1644922314/courses-graphql/bxsxhepxsuznifr8tljc.png',
                     rating: 4,
                     createdAt: '2022-02-15T10:51:53.305Z',
                     _count: {
                        users: 1,
                        reviews: 1,
                     },
                  },
               ],
            })
         )
      }
   ),
   graphql.query<CurrentUserQuery>('CurrentUser', (req, res, ctx) => {
      return res(
         ctx.data({
            __typename: 'Query',
            currentUser: {},
         })
      )
   }),
]
