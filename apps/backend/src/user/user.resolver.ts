import { UseGuards } from '@nestjs/common'
import {
   Args,
   Mutation,
   Parent,
   Query,
   ResolveField,
   Resolver,
   Int,
} from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { JwtPayload } from 'src/auth/model/jwt-payload'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { Course } from 'src/course/model/course.model'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './model/user.model'
import { UserService } from './user.service'
import { Roles } from '../common/decorators/roles.decorator'
import { UserRole } from './model/user.enum'
import { CurrentUserUnion } from './model/current-user.union'
import { OptionalAuth } from 'src/common/decorators/optional-auth.decorator'
import { ReviewFilterArgs } from 'src/review/dto/review-filter.args'
import { CoursesArgs } from 'src/course/dto/courses.args'
import { UserArgs } from './dto/user.args'

@Resolver(User)
export class UserResolver {
   constructor(private readonly userService: UserService) {}

   @UseGuards(JwtAuthGuard)
   @Roles(UserRole.ADMIN, UserRole.TESTER)
   @Mutation(() => User)
   createUser(@Args('data') data: CreateUserInput) {
      return this.userService.createUser(data)
   }

   @UseGuards(JwtAuthGuard)
   @Roles(UserRole.ADMIN, UserRole.TESTER)
   @Query(() => [User], { name: 'users' })
   findAll(@Args() params: UserArgs) {
      return this.userService.findAll(params)
   }

   @UseGuards(JwtAuthGuard)
   @Roles(UserRole.ADMIN, UserRole.TESTER)
   @Query(() => User, { name: 'user' })
   findOne(@Args('id') id: string) {
      return this.userService.findOne(id)
   }

   @UseGuards(JwtAuthGuard)
   @Mutation(() => User)
   updateUser(@Args('data') data: UpdateUserInput) {
      return this.userService.updateUser(data.id, data)
   }

   @UseGuards(JwtAuthGuard)
   @Roles(UserRole.ADMIN)
   @Mutation(() => User)
   removeUser(@Args('id') id: string) {
      return this.userService.removeUser(id)
   }

   @UseGuards(JwtAuthGuard)
   @Mutation(() => Course)
   signUpForCourse(
      @Args('courseId') courseId: number,
      @CurrentUser() user: JwtPayload
   ) {
      return this.userService.signUpForCourse(courseId, user.id)
   }

   @UseGuards(JwtAuthGuard)
   @Mutation(() => Course)
   signOutFromCourse(
      @Args('courseId') courseId: number,
      @CurrentUser() user: JwtPayload
   ) {
      return this.userService.signOutFromCourse(courseId, user.id)
   }

   @UseGuards(JwtAuthGuard)
   @OptionalAuth()
   @Query(() => CurrentUserUnion)
   currentUser(@CurrentUser() user: JwtPayload) {
      return this.userService.currentUser(user?.id)
   }

   @ResolveField()
   courses(@Parent() user: User, @Args() params: CoursesArgs) {
      return this.userService.findUserCourses(user.id, params)
   }

   @ResolveField()
   reviews(@Parent() user: User, @Args() params: ReviewFilterArgs) {
      return this.userService.findUserReviews(user.id, params)
   }

   @ResolveField(() => Int)
   count() {
      return this.userService.count()
   }
}
