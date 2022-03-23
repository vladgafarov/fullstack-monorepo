import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserCount {
   @Field()
   courses: number

   @Field()
   reviews: number
}
