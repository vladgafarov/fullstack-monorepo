import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { CreateUserInput } from 'src/user/dto/create-user.input'
import { User } from 'src/user/model/user.model'
import { AuthService } from './auth.service'
import { AuthInput } from './dto/auth.input'
import { ChangePasswordInput } from './dto/change-password.input'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtPayload } from './model/jwt-payload'
import { Tokens } from './model/access-token.model'
import { Auth } from './model/auth.model'
import { RequestPasswordInput } from './dto/request-password-reset.input'
import { ResetPasswordInput } from './dto/reset-password.input'
import { JwtRtGuard } from './guards/jwt-rt.guard'
import { JwtRtPayload } from './model/jwt-rt-payload'
import { Response } from 'express'

@Resolver(Auth)
export class AuthResolver {
   constructor(private readonly authService: AuthService) {}

   @Mutation(() => Tokens)
   async logIn(@Args('data') data: AuthInput, @Context('res') res: Response) {
      const payload = await this.authService.validateUser(data)
      const tokens = await this.authService.logIn(payload)
      res.cookie('access-token', tokens.access_token, {
         expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      res.cookie('refresh-token', tokens.refresh_token, {
         expires: new Date(Date.now() + 604800000),
      })

      return tokens
   }

   @UseGuards(JwtAuthGuard)
   @Mutation(() => User)
   async logOut(@CurrentUser() user: User, @Context('res') res: Response) {
      res.clearCookie('access-token')
      res.clearCookie('refresh-token')

      return this.authService.logOut(user.id)
   }

   @Mutation(() => Tokens)
   async signUp(@Args('data') data: CreateUserInput) {
      return this.authService.signUp(data)
   }

   @Mutation(() => User)
   async confirmUser(@Args('token') token: string) {
      return this.authService.confirmUser(token)
   }

   @UseGuards(JwtAuthGuard)
   @Mutation(() => User)
   changePassword(
      @Args('data') dto: ChangePasswordInput,
      @CurrentUser() user: JwtPayload
   ) {
      return this.authService.changePassword(dto, user)
   }

   @Mutation(() => JwtPayload)
   resetPassword(
      @Args('token') token: string,
      @Args('data') data: ResetPasswordInput
   ) {
      return this.authService.resetPassword(token, data)
   }

   @Mutation(() => Boolean)
   requestPasswordReset(@Args('data') data: RequestPasswordInput) {
      return this.authService.requestPasswordReset(data)
   }

   @UseGuards(JwtRtGuard)
   @Query(() => Tokens)
   async refreshTokens(
      @CurrentUser() user: JwtRtPayload,
      @Context('res') res: Response
   ) {
      const tokens = await this.authService.refreshTokens(
         user.id,
         user.refreshToken
      )
      res.cookie('access-token', tokens.access_token, {
         expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      res.cookie('refresh-token', tokens.refresh_token, {
         expires: new Date(Date.now() + 604800000),
      })

      return tokens
   }
}
