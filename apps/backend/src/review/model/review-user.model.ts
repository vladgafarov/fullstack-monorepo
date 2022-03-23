import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ReviewUser {
   @Field()
   id: string

   @Field()
   name: string

   @Field()
   lastName: string
}
