import { Injectable } from '@nestjs/common'
import {
   UploadApiErrorResponse,
   UploadApiResponse,
   v2 as cloudinary,
} from 'cloudinary'
import { FileUpload } from 'graphql-upload'

@Injectable()
export class CloudinaryService {
   async uploadImage(
      file: FileUpload
   ): Promise<UploadApiResponse | UploadApiErrorResponse> {
      return new Promise((resolve, reject) => {
         const upload = cloudinary.uploader.upload_stream(
            { folder: 'courses-graphql' },
            (error, result) => {
               if (error) return reject(error)
               resolve(result)
            }
         )
         const stream = file.createReadStream()
         stream.pipe(upload)
      })
   }
}
