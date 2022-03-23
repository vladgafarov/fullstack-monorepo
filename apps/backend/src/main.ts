import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GraphQLSchemaHost } from '@nestjs/graphql'
import { printSchema } from 'graphql'
import { writeFileSync } from 'fs'
import { join } from 'path'
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'
import { graphqlUploadExpress } from 'graphql-upload'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)
   const configService = app.get(ConfigService)
   app.setGlobalPrefix('api/v1')
   app.useGlobalPipes(new ValidationPipe())
   app.use(cookieParser())
   app.enableCors({
      origin: [configService.get('FRONTEND_URL'), 'http://localhost:7777'],
      credentials: true,
   })
   app.use(
      graphqlUploadExpress({
         maxFileSize: 1000000,
         maxFiles: 10,
      })
   )
   await app.listen(3000)

   // if (process.env.NODE_ENV === 'production') {
   // const { schema } = app.get(GraphQLSchemaHost)
   // writeFileSync(join(process.cwd(), `/src/schema.gql`), printSchema(schema))
   // }
}
bootstrap()
