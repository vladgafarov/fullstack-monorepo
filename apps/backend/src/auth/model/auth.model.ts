import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Auth {
   @Field()
   email: string

   @Field()
   password: string
}
