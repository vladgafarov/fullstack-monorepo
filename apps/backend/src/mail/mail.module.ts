import { MailerModule } from '@nestjs-modules/mailer'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailService } from './mail.service'

@Global()
@Module({
   providers: [MailService],
   exports: [MailService],
   imports: [
      MailerModule.forRootAsync({
         useFactory: async (config: ConfigService) => ({
            transport: {
               host: config.get('MAIL_HOST'),
               secure: false,
               auth: {
                  user: config.get('MAIL_USER'),
                  pass: config.get('MAIL_PASSWORD'),
               },
            },
            defaults: {
               from: `"Courses" <${config.get('MAIL_FROM')}>`,
            },
            template: {
               dir: __dirname + '/templates',
               adapter: new HandlebarsAdapter(),
               options: {
                  strict: true,
               },
            },
            // preview: true,
         }),
         inject: [ConfigService],
      }),
   ],
})
export class MailModule {}
