import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CloudinaryService } from './cloudinary.service'
import { v2 as cloudinary } from 'cloudinary'

@Module({
   providers: [
      CloudinaryService,
      {
         provide: 'Cloudinary',
         inject: [ConfigService],
         useFactory: async (config: ConfigService) => {
            return cloudinary.config({
               cloud_name: config.get('CDN_CLOUD_NAME'),
               api_key: config.get('CDN_API_KEY'),
               api_secret: config.get('CDN_API_SECRET'),
            })
         },
      },
   ],
   exports: [CloudinaryService],
})
export class CloudinaryModule {}
