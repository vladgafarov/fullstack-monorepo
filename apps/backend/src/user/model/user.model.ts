import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Course } from 'src/course/model/course.model'
import { Review } from 'src/review/model/review.model'
import { UserRole } from './user.enum'
import { UserCount } from './_count.model'

@ObjectType()
export class User {
   @Field(() => ID)
   id: string

   @Field()
   name: string

   @Field()
   lastName: string

   @Field()
   email: string

   @Field(() => UserRole)
   role: UserRole

   @Field()
   passwordHash: string

   @Field({ nullable: true })
   hashedRt: string

   @Field(() => [Course])
   courses: Course[]

   @Field(() => [Review])
   reviews: Review[]

   @Field(type => Date)
   createdAt: Date

   @Field(type => Date)
   updatedAt: Date

   @Field(() => Boolean)
   isActive: boolean

   @Field({ nullable: true })
   confirmTokenHash: string

   @Field(() => UserCount)
   _count: UserCount
}
