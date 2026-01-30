import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService){}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename:(req , file, callback)=>{
                    callback(
                        null,
                        `${Date.now()}-${file.originalname}`
                    )
                }
            })
        })
    )
    uploadFile(@UploadedFile() file: Express.Multer.File){
        return this.filesService.uploadLocal(file)
    }
}
