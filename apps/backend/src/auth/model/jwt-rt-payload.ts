import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserRole } from 'src/user/model/user.enum'

@ObjectType()
export class JwtRtPayload {
   @Field()
   email: string

   @Field()
   id: string

   @Field(() => UserRole)
   role: UserRole

   @Field()
   refreshToken: string

   @Field(() => Int)
   iat?: number

   @Field(() => Int)
   exp?: number
}
