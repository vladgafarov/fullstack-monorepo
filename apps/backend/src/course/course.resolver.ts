import { UseGuards } from '@nestjs/common'
import {
   Args,
   Int,
   Mutation,
   Parent,
   Query,
   ResolveField,
   Resolver,
} from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { JwtPayload } from 'src/auth/model/jwt-payload'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { OptionalAuth } from 'src/common/decorators/optional-auth.decorator'
import { CourseService } from './course.service'
import { CoursesArgs } from './dto/courses.args'
import { CreateCourseInput } from './dto/create-course.input'
import { Course } from './model/course.model'
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'src/user/model/user.enum'

@Resolver(Course)
export class CourseResolver {
   constructor(private readonly courseService: CourseService) {}

   @UseGuards(JwtAuthGuard)
   @OptionalAuth()
   @Query(() => Course)
   course(@Args('id') id: number) {
      return this.courseService.getCourse(id)
   }

   @UseGuards(JwtAuthGuard)
   @OptionalAuth()
   @Query(() => [Course])
   courses(@Args() params: CoursesArgs) {
      return this.courseService.getCourses(params)
   }

   @UseGuards(JwtAuthGuard)
   @Roles(UserRole.ADMIN, UserRole.TESTER)
   @Mutation(() => Course)
   createCourse(
      @Args('data') data: CreateCourseInput,
      @Args({ name: 'file', nullable: true, type: () => GraphQLUpload })
      file?: FileUpload
   ) {
      return this.courseService.createCourse(data, file)
   }

   @UseGuards(JwtAuthGuard)
   @Roles(UserRole.ADMIN, UserRole.TESTER)
   @Mutation(() => Course)
   removeCourse(@Args('id', { type: () => Int }) id: number) {
      return this.courseService.removeCourse(id)
   }

   @ResolveField(() => Boolean)
   currentUser(@Parent() course: Course, @CurrentUser() user: JwtPayload) {
      return this.courseService.checkCurrentUser(course.id, user?.id)
   }

   @ResolveField(() => Boolean)
   currentUserReview(
      @Parent() course: Course,
      @CurrentUser() user: JwtPayload
   ) {
      return this.courseService.checkCurrentUserReview(course.id, user?.id)
   }

   @ResolveField()
   count() {
      return this.courseService.count()
   }
}
