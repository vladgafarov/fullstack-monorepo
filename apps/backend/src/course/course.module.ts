import { Module } from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseResolver } from './course.resolver'
import { PrismaService } from 'src/prisma.service'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Module({
   imports: [CloudinaryModule],
   providers: [CourseService, CourseResolver, PrismaService, CloudinaryService],
})
export class CourseModule {}
