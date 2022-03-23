import { ArgsType, Field, InputType, Int } from '@nestjs/graphql'
import { IsOptional, Min } from 'class-validator'

@ArgsType()
export class PaginationArgs {
   @Field(type => Int, { nullable: true })
   @IsOptional()
   @Min(0)
   skip?: number

   @Field(type => Int, { nullable: true })
   @IsOptional()
   @Min(1)
   take?: number
}
