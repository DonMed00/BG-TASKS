import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './model/file';
import { Readable } from 'stream';

const configServiceMock = {
  get: (key: string) => {
    if (key === 'AZURE_CONNECTION') {
      return `DefaultEndpointsProtocol=https;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;`;
    }
    return undefined;
  },
};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/file-database'),
        MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should successfully upload a file', async () => {
    const mockFile: Express.Multer.File = {
      originalname: 'file.jpg',
      size: 1000,
      mimetype: 'image/jpeg',
      fieldname: '',
      encoding: '',
      stream: new Readable(),
      destination: '',
      filename: '',
      path: '',
      buffer: undefined,
    };
    const req = { ip: '127.0.0.1' };

    const expectedResult = { message: 'The file has been uploaded successfully.', file: null };
    const spyAppService = jest.spyOn(appService, 'uploadFile').mockResolvedValue(null);
    const result = await appController.uploadFile(mockFile, req);

    expect(spyAppService).toHaveBeenCalledWith(mockFile, req.ip);
    expect(result).toEqual(expectedResult);
  });
});
