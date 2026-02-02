import { BadRequestException, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) { }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    callback(
                        null,
                        `${Date.now()}-${file.originalname}`
                    )
                }
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/(jpg|jpeg|png)$/)) {
                    return callback(new BadRequestException('Invalide File type'), false)
                }
                callback(null, true)
            },
        })
    )
    uploadFile(@UploadedFile(/* new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 500000 }),
            new FileTypeValidator({ fileType: 'image/jpeg' }) 
        ]
    }) */) file: Express.Multer.File) {
        return this.filesService.uploadLocal(file)
    }




    @Post("uploads3")
    @UseInterceptors(
        FileInterceptor("file", {
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
            fileFilter(req, file, callback) {
                if (!file.mimetype.match(/(jpg|jpeg|png)$/)) {
                    return callback(new Error("Invalid file type"), false);
                }
                callback(null, true);
            },
        }),
    )
    upload(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.uploadFile(file);
    }


}
