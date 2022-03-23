import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { User } from 'src/user/model/user.model'

@Injectable()
export class MailService {
   constructor(private readonly mailerService: MailerService) {}

   async sendResetPasswordLink(user: Partial<User>, link: string) {
      await this.mailerService.sendMail({
         to: 'boi.foma@yandex.ru',
         // to: user.email,
         // from: '"Support Team" <support@example.com>', // override default from
         subject: 'Смена пароля',
         template: '/resetPassword', // `.hbs` extension is appended automatically
         context: {
            name: user.name,
            url: link,
         },
      })
   }

   async sendConfirmationLink(user: Partial<User>, link: string) {
      await this.mailerService.sendMail({
         to: 'boi.foma@yandex.ru',
         // to: user.email,
         // from: '"Support Team" <support@example.com>', // override default from
         subject: 'Подтверждение регистрации',
         template: '/confirmUser',
         context: {
            name: user.name,
            url: link,
         },
      })
   }
}
