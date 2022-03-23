import { registerEnumType } from '@nestjs/graphql'

export enum CourseOrderBy {
   rating = 'rating',
   price = 'price',
   createdAt = 'createdAt',
   title = 'title',
   id = 'id',
   users = 'users',
   reviews = 'reviews',
   discount = 'discount',
}

registerEnumType(CourseOrderBy, {
   name: 'CourseOrderBy',
   description: 'Order by for courses',
})
