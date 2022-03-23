import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewResolver } from './review.resolver'
import { PrismaService } from 'src/prisma.service'
import { CourseModule } from 'src/course/course.module'
import { CourseService } from 'src/course/course.service'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'

@Module({
   imports: [CourseModule, CloudinaryModule],
   providers: [ReviewResolver, ReviewService, PrismaService, CourseService],
})
export class ReviewModule {}
