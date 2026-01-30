import { ConflictException, Injectable } from '@nestjs/common';

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
}
