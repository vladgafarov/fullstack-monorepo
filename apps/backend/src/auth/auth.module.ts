import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtRtStrategy } from './jwt-rt.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
   imports: [
      JwtModule.registerAsync({
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
         }),
      }),
      UserModule,
   ],
   providers: [
      AuthService,
      ConfigService,
      JwtStrategy,
      JwtRtStrategy,
      UserService,
      PrismaService,
      AuthResolver,
   ],
})
export class AuthModule {}
