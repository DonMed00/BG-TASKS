import { Injectable } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { FileDocument } from '../model/file.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AzureBlobService {
  private blobServiceClient: BlobServiceClient;
  private containerClient: ContainerClient;

  constructor(
    @InjectModel('File') private fileModel: Model<FileDocument>,
  ) {
    const connectionString = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;";
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