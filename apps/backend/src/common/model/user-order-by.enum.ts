import { registerEnumType } from '@nestjs/graphql'

export enum UserOrderBy {
   id = 'id',
   name = 'name',
   lastName = 'lastName',
   email = 'email',
   role = 'role',
   courses = 'courses',
   reviews = 'reviews',
}

registerEnumType(UserOrderBy, {
   name: 'UserOrderBy',
   description: 'Order by for users',
})
