import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CourseCount {
   @Field(() => Int)
   users: number

   @Field(() => Int)
   reviews: number
}
