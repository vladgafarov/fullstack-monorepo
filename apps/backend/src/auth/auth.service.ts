import {
   BadRequestException,
   ForbiddenException,
   HttpException,
   HttpStatus,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { AuthInput } from './dto/auth.input'
import {
   CHANGE_PASSWORD_ERROR,
   INVALID_TOKEN,
   LOGIN_ERROR,
   NOT_EQUAL_PASSWORDS,
} from './auth.constants'
import { ChangePasswordInput } from './dto/change-password.input'
import { JwtPayload } from './model/jwt-payload'
import { UserService } from 'src/user/user.service'
import { RequestPasswordInput } from './dto/request-password-reset.input'
import { MailService } from 'src/mail/mail.service'
import { ResetPasswordInput } from './dto/reset-password.input'
import { ConfigService } from '@nestjs/config'
import { CreateUserInput } from 'src/user/dto/create-user.input'
import { User } from 'src/user/model/user.model'
import * as argon2 from 'argon2'
import { Cron, CronExpression } from '@nestjs/schedule'
import { formatDistanceToNowStrict } from 'date-fns'
import { UserRole } from 'src/user/model/user.enum'

@Injectable()
export class AuthService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly prismaService: PrismaService,
      private readonly userService: UserService,
      private readonly mailService: MailService,
      private readonly configService: ConfigService
   ) {}

   async validateUser({ email, password }: AuthInput) {
      const user = await this.prismaService.user.findUnique({
         where: { email },
      })

      if (!user) {
         throw new UnauthorizedException(LOGIN_ERROR)
      }

      const isCorrectPassword = await argon2.verify(user.passwordHash, password)
      if (!isCorrectPassword) {
         throw new UnauthorizedException(LOGIN_ERROR)
      }

      return {
         email: user.email,
         id: user.id,
         role: user.role,
      } as JwtPayload
   }

   async logIn(payload: JwtPayload) {
      const tokens = await this.getTokens(payload)

      await this.updateRtHash(payload.id, tokens.refresh_token)

      return tokens
   }

   logOut(id: string) {
      return this.prismaService.user.update({
         where: { id },
         data: { hashedRt: null },
      })
   }

   async signUp(data: CreateUserInput) {
      const user = await this.userService.createUser(data)
      const payload = {
         email: user.email,
         id: user.id,
         role: user.role,
      } as JwtPayload

      const tokens = await this.getTokens(payload)
      await this.updateRtHash(user.id, tokens.refresh_token)

      const confirmToken = await this.jwtService.signAsync(payload, {
         secret: this.configService.get('JWT_SECRET'),
         expiresIn: '48h',
      })
      const confirmTokenHash = await argon2.hash(confirmToken)
      await this.prismaService.user.update({
         where: { id: user.id },
         data: {
            confirmTokenHash,
         },
      })

      const link = `http://${this.configService.get(
         'FRONTEND_URL'
      )}/confirm?token=${confirmToken}`

      await this.mailService.sendConfirmationLink(user as User, link)

      return tokens
   }

   async confirmUser(token: string) {
      const payload = (await this.jwtService.verifyAsync(token, {
         secret: this.configService.get('JWT_SECRET'),
      })) as JwtPayload

      const user = await this.userService.findOne(payload.id)

      try {
         await argon2.verify(user.confirmTokenHash, token)
      } catch (error) {
         throw new BadRequestException(INVALID_TOKEN)
      }

      return await this.prismaService.user.update({
         where: { id: user.id },
         data: {
            isActive: true,
            confirmTokenHash: null,
         },
      })
   }

   async changePassword(data: ChangePasswordInput, user: JwtPayload) {
      const { passwordHash } = await this.userService.findOne(user.id)

      const isEqual = await argon2.verify(passwordHash, data.password)
      if (isEqual) {
         throw new BadRequestException(CHANGE_PASSWORD_ERROR)
      }

      return this.prismaService.user.update({
         where: {
            id: user.id,
         },
         data: {
            passwordHash: await this.userService.hashPassword(data.password),
         },
      })
   }

   async resetPassword(token: string, data: ResetPasswordInput) {
      let user: JwtPayload

      if (data.password !== data.repeatPassword) {
         throw new BadRequestException(NOT_EQUAL_PASSWORDS)
      }

      try {
         user = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('JWT_SECRET'),
         })
      } catch (err) {
         const message = 'Token error: ' + (err.message || err.name)
         throw new HttpException(message, HttpStatus.BAD_REQUEST)
      }

      await this.changePassword({ password: data.password }, user)

      return user
   }

   async requestPasswordReset(data: RequestPasswordInput) {
      const user = await this.prismaService.user.findUnique({
         where: { email: data.email },
      })

      if (!user) {
         return true
      }

      const { id, email, role, name } = user

      const payload = {
         id,
         email,
         role,
      } as JwtPayload

      const token = await this.jwtService.signAsync(payload)

      const link = `${this.configService.get(
         'FRONTEND_URL'
      )}/reset-password/${token}`
      await this.mailService.sendResetPasswordLink({ email, name }, link)

      return true
   }

   async refreshTokens(userId: string, rt: string) {
      const user = await this.prismaService.user.findUnique({
         where: {
            id: userId,
         },
      })

      if (!user || !user.hashedRt) {
         throw new ForbiddenException('Access Denied')
      }

      const rtMatches = await argon2.verify(user.hashedRt, rt)
      if (!rtMatches) throw new ForbiddenException('Access Denied')

      const tokens = await this.getTokens({
         id: user.id,
         email: user.email,
         role: user.role as UserRole,
      })
      await this.updateRtHash(user.id, tokens.refresh_token)

      return tokens
   }

   async updateRtHash(userId: string, rt: string) {
      const hashedRt = await argon2.hash(rt)

      await this.prismaService.user.update({
         where: {
            id: userId,
         },
         data: {
            hashedRt,
         },
      })
   }

   async getTokens(payload: JwtPayload) {
      const [at, rt] = await Promise.all([
         this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '1h',
         }),
         this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '7d',
         }),
      ])

      return {
         access_token: at,
         refresh_token: rt,
      }
   }

   // @Cron(CronExpression.EVERY_HOUR)
   async removeNotActivatedUsers() {
      const users = await this.prismaService.user.findMany({
         where: {
            isActive: false,
         },
         include: {
            reviews: {
               select: {
                  id: true,
               },
            },
         },
      })
      let count = 0
      const usersEmail = []

      users.forEach(async user => {
         const diff = formatDistanceToNowStrict(user.createdAt)

         if (diff.includes('days')) {
            if (user.reviews.length > 0) {
               user.reviews.forEach(async review => {
                  await this.prismaService.review.delete({
                     where: { id: review.id },
                  })
               })
            }

            const deletedUser = await this.prismaService.user.delete({
               where: { id: user.id },
               select: { email: true },
            })
            count += 1
            usersEmail.push(deletedUser.email)
         }
      })

      if (count === 0) {
         console.log('Неактивированные пользователи отсутствуют')
         return
      }

      console.log(`Удалено пользоветелей: ${count}`)
      usersEmail?.forEach(userEmail => console.log(userEmail))
   }
}
