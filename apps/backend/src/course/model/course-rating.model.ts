import { Field, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CourseRating {
   @Field(() => Float)
   rating: number
}
