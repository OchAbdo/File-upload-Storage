import { PutObjectCommand } from '@aws-sdk/client-s3';
import { ConflictException, Injectable } from '@nestjs/common';
import { S3client } from 'src/config/minio.config';
import {v4 as uuid} from "uuid"
@Injectable()
export class FilesService {

    uploadLocal(file: Express.Multer.File) {
        if (!file) {
            throw new ConflictException('No file uploaded');
        }
        return {
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url: `http://localhost:3000/uploads/${file.filename}`
        }
    }


    async uploadFile(file: Express.Multer.File) {
    const fileKey = `${uuid()}-${file.originalname}`;

    await S3client.send(
      new PutObjectCommand({
        Bucket: "uploads",
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        Metadata: {
          originalName: file.originalname,
          size: file.size.toString(),
        },
      }),
    );

    return {
      message: "File uploaded successfully",
      fileName: fileKey,
      size: file.size,
      type: file.mimetype,
    };
  }

}
