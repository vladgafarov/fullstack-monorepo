import { InputType, Int, Field, ID } from '@nestjs/graphql'
import {
   IsNumber,
   IsOptional,
   IsString,
   Max,
   Min,
   MinLength,
} from 'class-validator'

@InputType()
export class CreateReviewInput {
   @IsNumber()
   @Min(1)
   @Max(5)
   @Field(() => Int)
   rating: number

   @IsString()
   @IsOptional()
   @MinLength(3)
   @Field({ nullable: true })
   text?: string

   @IsNumber()
   @Field(() => Int)
   courseId: number
}
