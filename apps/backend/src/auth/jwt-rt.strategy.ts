import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtPayload } from './model/jwt-payload'
import { Request } from 'express'

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
   constructor(private readonly configService: ConfigService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get('JWT_SECRET'),
         passReqToCallback: true,
      })
   }

   async validate(req: Request, payload: JwtPayload) {
      const refreshToken = req
         ?.get('authorization')
         ?.replace('Bearer', '')
         .trim()

      if (!refreshToken) throw new ForbiddenException('Refresh token malformed')

      return {
         ...payload,
         refreshToken,
      }
   }
}
