import {
   Injectable,
   NotFoundException,
   BadRequestException,
} from '@nestjs/common'
import { JwtPayload } from 'src/auth/model/jwt-payload'
import { ReviewOrderBy } from 'src/common/model/review-order-by.enum'
import { CourseService } from 'src/course/course.service'
import { PrismaService } from 'src/prisma.service'
import { CreateReviewInput } from './dto/create-review.input'
import { ReviewsArgs } from './dto/reviews.args'
import { UpdateReviewInput } from './dto/update-review.input'
import {
   REVIEW_NOT_FOUND,
   USER_NOT_IN_COURSE,
   USERS_REVIEW_EXISTS,
} from './review.constants'

@Injectable()
export class ReviewService {
   constructor(
      private readonly prismaService: PrismaService,
      private readonly courseService: CourseService
   ) {}

   async create(data: CreateReviewInput, user: JwtPayload) {
      await this.checkUser(data.courseId, user.id)

      const createdReview = await this.prismaService.review.create({
         data: {
            rating: data.rating,
            text: data.text,
            courseId: data.courseId,
            userId: user.id,
         },
      })

      await this.courseService.countRating(createdReview.courseId)

      return createdReview
   }

   findAll({ skip, take, orderBy, sortOrder }: ReviewsArgs) {
      let orderByObj

      if (orderBy === ReviewOrderBy.course) {
         orderByObj = {
            [orderBy]: {
               title: sortOrder,
            },
         }
      } else if (orderBy === ReviewOrderBy.user) {
         orderByObj = {
            [orderBy]: {
               name: sortOrder,
            },
         }
      } else if (orderBy) {
         orderByObj = { [orderBy]: sortOrder }
      }

      return this.prismaService.review.findMany({
         include: {
            user: {
               select: {
                  name: true,
                  lastName: true,
                  id: true,
               },
            },
            course: true,
         },
         orderBy: orderByObj,
         skip,
         take,
      })
   }

   async findOne(id: string) {
      const review = await this.prismaService.review.findUnique({
         where: { id },
         include: {
            user: {
               select: {
                  name: true,
                  lastName: true,
                  id: true,
               },
            },
            course: true,
         },
      })

      if (!review) {
         throw new NotFoundException(REVIEW_NOT_FOUND)
      }

      return review
   }

   async update(data: UpdateReviewInput) {
      const { id, ...restData } = data

      const review = await this.findOne(id)

      const updatedReview = await this.prismaService.review.update({
         where: {
            id,
         },
         data: { ...restData },
      })

      await this.courseService.countRating(review.courseId)

      return updatedReview
   }

   async remove(id: string) {
      const review = await this.findOne(id)

      const deletedReview = await this.prismaService.review.delete({
         where: {
            id,
         },
      })

      await this.courseService.countRating(review.courseId)

      return deletedReview
   }

   async checkUser(courseId: number, userId: string) {
      const userInCourse = await this.prismaService.course.findMany({
         where: {
            AND: [
               {
                  id: courseId,
               },
               {
                  users: {
                     some: {
                        id: userId,
                     },
                  },
               },
            ],
         },
         include: {
            reviews: {
               where: {
                  userId,
               },
            },
         },
      })

      if (userInCourse.length === 0) {
         throw new BadRequestException(USER_NOT_IN_COURSE)
      }

      if (userInCourse[0].reviews.length !== 0) {
         throw new BadRequestException(USERS_REVIEW_EXISTS)
      }
   }

   async checkCurrentUser(reviewId: string, userId: string) {
      if (!userId) {
         return null
      }

      const review = await this.prismaService.review.findMany({
         where: {
            id: reviewId,
            userId,
         },
      })

      return review.length > 0 ? true : null
   }

   count() {
      return this.prismaService.review.count()
   }
}
