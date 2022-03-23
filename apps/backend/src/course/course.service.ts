import { Injectable, NotFoundException } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import { FileUpload } from 'graphql-upload'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { CourseOrderBy } from 'src/common/model/course-order-by.enum'
import { PrismaService } from 'src/prisma.service'
import { COURSE_DOES_NOT_EXIST } from './course.constants'
import { CoursesArgs } from './dto/courses.args'
import { CreateCourseInput } from './dto/create-course.input'

@Injectable()
export class CourseService {
   constructor(
      private prismaService: PrismaService,
      private cloudinaryService: CloudinaryService
   ) {}

   async getCourse(id: number) {
      const course = await this.prismaService.course.findUnique({
         where: {
            id,
         },
         include: {
            users: true,
            reviews: {
               orderBy: {
                  createdAt: 'desc',
               },
               include: {
                  user: true,
                  course: true,
               },
            },
            _count: true,
         },
      })

      if (!course) {
         throw new NotFoundException(COURSE_DOES_NOT_EXIST)
      }

      return course
   }

   async getCourses({ skip, take, orderBy, sortOrder, title }: CoursesArgs) {
      let orderByObj

      if (
         orderBy === CourseOrderBy.reviews ||
         orderBy === CourseOrderBy.users
      ) {
         orderByObj = {
            [orderBy]: {
               _count: sortOrder,
            },
         }
      } else if (orderBy) {
         orderByObj = {
            [orderBy]: sortOrder,
         }
      }

      const courses = await this.prismaService.course.findMany({
         where: {
            title: {
               contains: title,
               mode: 'insensitive',
            },
         },
         include: {
            users: true,
            reviews: {
               orderBy: {
                  createdAt: 'desc',
               },
               include: {
                  user: true,
                  course: true,
               },
            },
            _count: true,
         },
         orderBy: orderByObj,
         take,
         skip,
      })

      return courses
   }

   async createCourse(data: CreateCourseInput, file?: FileUpload) {
      let image: UploadApiResponse | UploadApiErrorResponse

      if (file) {
         image = await this.cloudinaryService.uploadImage(file)
      }

      return this.prismaService.course.create({
         data: {
            ...data,
            mainImage: image?.url,
         },
      })
   }

   removeCourse(id: number) {
      return this.prismaService.course.delete({ where: { id } })
   }

   async countRating(id: number) {
      await this.getCourse(id)

      const avgRating = await this.prismaService.review.aggregate({
         where: {
            courseId: id,
         },
         _avg: {
            rating: true,
         },
      })

      if (!avgRating._avg.rating) {
         return
      }

      await this.prismaService.course.update({
         where: { id },
         data: {
            rating: avgRating._avg.rating,
         },
      })

      return avgRating._avg
   }

   async checkCurrentUser(courseId: number, userId: string) {
      if (!userId) {
         return null
      }

      const course = await this.prismaService.course.findUnique({
         where: {
            id: courseId,
         },
         include: {
            users: true,
         },
      })

      const user = course.users.find(user => user.id === userId)

      return user ? true : null
   }

   async checkCurrentUserReview(courseId: number, userId: string) {
      if (!userId) {
         return null
      }

      const [course] = await this.prismaService.course.findMany({
         where: {
            id: courseId,
            reviews: {
               some: {
                  userId,
               },
            },
         },
      })

      return !!course
   }

   count() {
      return this.prismaService.course.count()
   }
}
