import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AzureBlobService } from './azure-blob/azure-blob.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private azureBlobService: AzureBlobService) {}


@Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const fileRes = await this.azureBlobService.uploadFile(file, req.ip);
    return { message: 'The file has been uploaded successfully.', file: fileRes };
  }
}
