import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtPayload } from './model/jwt-payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   constructor(private readonly configService: ConfigService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get('JWT_SECRET'),
      })
   }

   async validate(payload: JwtPayload) {
      return payload
   }
}
