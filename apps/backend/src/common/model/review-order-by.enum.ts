import { registerEnumType } from '@nestjs/graphql'

export enum ReviewOrderBy {
   rating = 'rating',
   createdAt = 'createdAt',
   id = 'id',
   text = 'text',
   user = 'user',
   course = 'course',
}

registerEnumType(ReviewOrderBy, {
   name: 'ReviewOrderBy',
   description: 'Order by for reviews',
})
