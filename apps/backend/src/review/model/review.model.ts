import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Course } from 'src/course/model/course.model'
import { ReviewUser } from './review-user.model'

@ObjectType()
export class Review {
   @Field()
   id: string

   @Field(() => Int)
   rating: number

   @Field({ nullable: true })
   text?: string

   @Field()
   userId: string

   @Field(() => ID)
   courseId: number

   @Field(() => ReviewUser)
   user: ReviewUser

   @Field(() => Course)
   course: Course

   @Field(type => Date)
   createdAt: Date

   @Field(type => Date)
   updatedAt: Date

   @Field(() => Boolean, { nullable: true })
   currentUser: boolean
}
