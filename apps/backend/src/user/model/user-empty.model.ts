import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserEmpty {
   @Field(() => Boolean, { defaultValue: false })
   user: boolean
}
