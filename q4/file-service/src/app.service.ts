import { Injectable } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { FileDocument } from './model/file';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    private blobServiceClient: BlobServiceClient;
    private containerClient: ContainerClient;
  
    constructor(
      @InjectModel('File') private fileModel: Model<FileDocument>,
      private configService: ConfigService
    ) {
      const connectionString = this.configService.get<string>('AZURE_CONNECTION');
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      this.containerClient = this.blobServiceClient.getContainerClient('file-service');
      this.initializeContainer();
    }
  
    private async initializeContainer(): Promise<void> {
      try {
        const createContainerResponse = await this.containerClient.createIfNotExists();
        if (createContainerResponse.succeeded) {
          console.log('Container created successfully');
        }
      } catch (error) {
        console.error('Error creating or verifying container:', error);
      }
    }
  
    async uploadFile(file: Express.Multer.File, sourceIp: string): Promise<FileDocument> {
      try {
        const blockBlobClient = this.containerClient.getBlockBlobClient(file.originalname);
        await blockBlobClient.upload(file.buffer, file.buffer.length);
  
        const fileRecord = new this.fileModel({
          name: file.originalname,
          size: file.size,
          contentType: file.mimetype,
          extension: file.originalname.split('.').pop(),
          sourceIp: sourceIp,
          filePath: blockBlobClient.url
        });
  
        return fileRecord.save();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
}
