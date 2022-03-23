import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { Review } from 'src/review/model/review.model'
import { User } from 'src/user/model/user.model'
import { CourseCount } from './course-count.model'

@ObjectType()
export class Course {
   @Field(type => Int)
   id: number

   @Field()
   title: string

   @Field()
   description: string

   @Field({ nullable: true })
   mainImage?: string

   @Field({ nullable: true })
   images?: string

   @Field(type => Float, { nullable: true })
   rating: number

   @Field(type => Int)
   price: number

   @Field(type => Int, { nullable: true })
   discount?: number

   @Field(() => [User])
   users: User[]

   @Field(type => Date)
   createdAt: Date

   @Field(type => Date)
   updatedAt: Date

   @Field(() => [Review])
   reviews: Review[]

   @Field(() => CourseCount)
   _count: CourseCount

   @Field(() => Boolean, { nullable: true })
   currentUser: boolean

   @Field(() => Boolean, { nullable: true })
   currentUserReview: boolean

   @Field(() => Int)
   count: number

   @Field(() => Int)
   userCount: number
}
