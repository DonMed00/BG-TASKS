import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}


@Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const fileRes = await this.appService.uploadFile(file, req.ip);
    return { message: 'The file has been uploaded successfully.', file: fileRes };
  }
}
