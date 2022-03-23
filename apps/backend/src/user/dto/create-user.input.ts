import { Field, InputType } from '@nestjs/graphql'
import {
   IsEmail,
   IsEnum,
   IsOptional,
   IsString,
   Min,
   MinLength,
} from 'class-validator'
import { UserRole } from '../model/user.enum'

@InputType()
export class CreateUserInput {
   @IsString()
   @Field()
   name: string

   @IsString()
   @Field()
   lastName: string

   @IsEmail()
   @Field()
   email: string

   @IsString()
   @MinLength(6)
   @Field()
   password: string

   @IsEnum(UserRole)
   @IsOptional()
   @Field(() => UserRole, { nullable: true })
   role?: UserRole
}
