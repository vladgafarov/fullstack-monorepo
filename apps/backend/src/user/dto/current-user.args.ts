import { ArgsType, Field } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@ArgsType()
export class CurrentUserArgs {
   @Field({ nullable: true })
   @IsString()
   @IsOptional()
   token?: string
}
