import { createUnionType } from '@nestjs/graphql'
import { UserEmpty } from './user-empty.model'
import { User } from './user.model'

export const CurrentUserUnion = createUnionType({
   name: 'CurrentUserUnion',
   types: () => [User, UserEmpty],
   resolveType(value) {
      if (value.email) {
         return User
      }
      return UserEmpty
   },
})
