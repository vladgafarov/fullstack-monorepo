import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { CourseModule } from './course/course.module'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import { ReviewModule } from './review/review.module'
import { ScheduleModule } from '@nestjs/schedule'
import { CloudinaryModule } from './cloudinary/cloudinary.module'

@Module({
   imports: [
      GraphQLModule.forRootAsync({
         inject: [ConfigService],
         useFactory: (configService: ConfigService) => ({
            autoSchemaFile: true,
            context: ({ req, res }) => ({ req, res }),
            cors: {
               origin: [
                  configService.get('FRONTEND_URL'),
                  'http://localhost:7777',
               ],
               credentials: true,
            },
         }),
      }),
      ScheduleModule.forRoot(),
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      CourseModule,
      UserModule,
      AuthModule,
      ReviewModule,
      MailModule,
      CloudinaryModule,
   ],
   controllers: [],
   providers: [PrismaService],
})
export class AppModule {}
