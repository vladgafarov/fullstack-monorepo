import { Field, Float, ID, InputType, Int } from '@nestjs/graphql'
import {
   IsString,
   IsInt,
   Min,
   Max,
   IsPositive,
   IsOptional,
   MaxLength,
} from 'class-validator'

@InputType()
export class CreateCourseInput {
   @IsString()
   @Field()
   @MaxLength(50)
   title: string

   @IsString()
   @Field()
   @MaxLength(1000)
   description: string

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   mainImage?: string

   @IsOptional()
   @IsString()
   @Field({ nullable: true })
   images?: string

   @IsInt()
   @IsPositive()
   @Field(() => Int)
   price: number

   @IsOptional()
   @IsInt()
   @Min(0)
   @Max(100)
   @Field(type => Int, { nullable: true })
   discount?: number

   @IsString({ each: true })
   @IsOptional()
   @Field(() => [ID], { nullable: true })
   users?: string[]
}
