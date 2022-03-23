import { Field, InputType } from '@nestjs/graphql'
import { IsString, MinLength } from 'class-validator'

@InputType()
export class ChangePasswordInput {
   @IsString()
   @MinLength(6)
   @Field()
   password: string
}
