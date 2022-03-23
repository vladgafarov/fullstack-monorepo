import { InputType, Int, Field, ID } from '@nestjs/graphql'
import {
   IsNumber,
   IsOptional,
   IsString,
   IsUUID,
   Max,
   Min,
} from 'class-validator'

@InputType()
export class UpdateReviewInput {
   @IsNumber()
   @IsOptional()
   @Min(1)
   @Max(5)
   @Field(() => Int, { nullable: true })
   rating?: number

   @IsString()
   @IsOptional()
   @Field({ nullable: true })
   text?: string

   @IsUUID()
   @Field()
   id: string
}
