import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureBlobService } from './azure-blob/azure-blob.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './model/file.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/file-database"),
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }])

  ],
  controllers: [AppController],
  providers: [AppService, AzureBlobService],
})
export class AppModule {}
