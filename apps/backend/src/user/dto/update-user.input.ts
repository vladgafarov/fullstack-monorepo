import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsEnum, IsOptional, IsString, Min } from 'class-validator'
import { UserRole } from '../model/user.enum'

@InputType()
export class UpdateUserInput {
   @IsString()
   @Field()
   id: string

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   name?: string

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   lastName?: string

   @IsEmail()
   @IsOptional()
   @Field({ nullable: true })
   email?: string

   @IsEnum(UserRole)
   @IsOptional()
   @Field(() => UserRole, { nullable: true })
   role?: UserRole
}
