import {
   BadRequestException,
   Injectable,
   NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import {
   COURSE_DOES_NOT_EXIST,
   USER_ALREADY_EXISTS,
   USER_DOES_NOT_EXIST,
} from './user.constants'
import { UpdateUserInput } from './dto/update-user.input'
import { ConfigService } from '@nestjs/config'
import * as argon2 from 'argon2'
import { ReviewFilterArgs } from 'src/review/dto/review-filter.args'
import { CoursesArgs } from 'src/course/dto/courses.args'
import { UserArgs } from './dto/user.args'
import { UserOrderBy } from 'src/common/model/user-order-by.enum'

@Injectable()
export class UserService {
   constructor(
      private readonly prismaService: PrismaService,
      private readonly configService: ConfigService
   ) {}

   async createUser(data: CreateUserInput) {
      const user = await this.prismaService.user.findUnique({
         where: { email: data.email },
      })

      if (user) {
         throw new BadRequestException(USER_ALREADY_EXISTS)
      }

      const { password, ...restData } = data

      return this.prismaService.user.create({
         data: {
            ...restData,
            passwordHash: await this.hashPassword(password),
         },
      })
   }

   findAll({ skip, take, orderBy, sortOrder }: UserArgs) {
      let orderByObj

      if (orderBy === UserOrderBy.reviews || orderBy === UserOrderBy.courses) {
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

      return this.prismaService.user.findMany({
         include: {
            courses: true,
            reviews: true,
            _count: {
               select: {
                  courses: true,
                  reviews: true,
               },
            },
         },
         orderBy: orderByObj,
         skip,
         take,
      })
   }

   async findOne(id: string) {
      const user = await this.prismaService.user.findUnique({
         where: {
            id,
         },
         include: {
            _count: true,
         },
      })

      if (!user) {
         throw new NotFoundException(USER_DOES_NOT_EXIST)
      }

      return user
   }

   findUserCourses(
      userId: string,
      { skip, take, orderBy, sortOrder }: CoursesArgs
   ) {
      return this.prismaService.course.findMany({
         where: {
            users: {
               some: {
                  id: userId,
               },
            },
         },
         skip,
         take,
         orderBy: {
            [orderBy]: sortOrder,
         },
         include: {
            reviews: true,
            users: true,
         },
      })
   }

   findUserReviews(
      userId: string,
      { skip, take, orderBy, sortOrder }: ReviewFilterArgs
   ) {
      return this.prismaService.review.findMany({
         where: {
            userId,
         },
         skip,
         take,
         orderBy: {
            [orderBy]: sortOrder,
         },
         include: {
            course: true,
            user: true,
         },
      })
   }

   async updateUser(id: string, data: UpdateUserInput) {
      await this.findOne(id)

      const { id: userId, ...restData } = data

      return this.prismaService.user.update({
         where: { id: userId },
         data: restData,
      })
   }

   async removeUser(id: string) {
      const user = await this.findOne(id)

      return this.prismaService.user.delete({ where: { id: user.id } })
   }

   async hashPassword(password: string) {
      return await argon2.hash(password)
   }

   async signUpForCourse(courseId: number, userId: string) {
      try {
         return await this.prismaService.course.update({
            where: { id: courseId },
            data: {
               users: { connect: { id: userId } },
               userCount: {
                  increment: 1,
               },
            },
         })
      } catch (error) {
         throw new NotFoundException(COURSE_DOES_NOT_EXIST)
      }
   }

   async signOutFromCourse(courseId: number, userId: string) {
      try {
         return await this.prismaService.course.update({
            where: { id: courseId },
            data: {
               users: { disconnect: { id: userId } },
            },
         })
      } catch (error) {
         throw new NotFoundException(COURSE_DOES_NOT_EXIST)
      }
   }

   async currentUser(userId: string) {
      if (!userId) {
         return {}
      }

      const user = await this.findOne(userId)

      return user
   }

   count() {
      return this.prismaService.user.count()
   }
}
