import { Field, InputType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
export class RequestPasswordInput {
   @IsEmail()
   @Field()
   email: string
}
