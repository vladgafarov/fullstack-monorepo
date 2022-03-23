import { Field, InputType } from '@nestjs/graphql'
import { IsString, MinLength } from 'class-validator'

@InputType()
export class ResetPasswordInput {
   @MinLength(6)
   @IsString()
   @Field()
   password: string

   @MinLength(6)
   @IsString()
   @Field()
   repeatPassword: string
}
