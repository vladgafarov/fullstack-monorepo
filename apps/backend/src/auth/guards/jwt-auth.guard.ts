import {
   ExecutionContext,
   ForbiddenException,
   HttpException,
   HttpStatus,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { UserRole } from 'src/user/model/user.enum'
import { JwtPayload } from '../model/jwt-payload'
import * as jwt from 'jsonwebtoken'
import { FOBIDDEN_RESOURCE, INVALID_TOKEN } from '../auth.constants'
import { IS_OPTIONAL_AUTH } from 'src/common/decorators/optional-auth.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   constructor(
      private readonly reflector: Reflector,
      private readonly configService: ConfigService
   ) {
      super()
   }

   canActivate(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context)

      const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
         ctx.getHandler(),
         ctx.getClass(),
      ])
      const optionalAuth = this.reflector.getAllAndOverride<boolean>(
         IS_OPTIONAL_AUTH,
         [ctx.getHandler(), ctx.getClass()]
      )

      const request = ctx.getContext().req

      if (!request.headers.authorization) {
         if (optionalAuth) {
            return true
         }
         throw new UnauthorizedException()
      }

      const user = this.validateToken(request.headers.authorization)
      request.user = user

      if (roles && !roles.includes(user.role)) {
         throw new ForbiddenException(FOBIDDEN_RESOURCE)
      }

      return true
   }

   validateToken(auth: string) {
      if (auth.split(' ')[0] !== 'Bearer') {
         throw new UnauthorizedException(INVALID_TOKEN)
      }
      const token = auth.split(' ')[1]

      try {
         const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'))
         return decoded as JwtPayload
      } catch (err) {
         const message = 'Token error: ' + (err.message || err.name)
         throw new HttpException(message, HttpStatus.UNAUTHORIZED)
      }
   }
}
