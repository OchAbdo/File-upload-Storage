import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3client } from "../config/minio.config";
import { FilesService } from "./files.service";
import { ConflictException } from "@nestjs/common";

describe('FilesService', () => {
  let service: FilesService;

  const mockS3Client = {
    send: jest.fn(),
  };

  const mockFile = {
    filename: 'file.png',
    originalname: 'file.png',
    mimetype: 'image/png',
    size: 1024,
    buffer: Buffer.from('test'),
  } as Express.Multer.File;

  beforeEach(async () => {
    service = new FilesService();
    (S3client.send as any) = mockS3Client.send;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should return correct object for uploadLocal', () => {
    const result = service.uploadLocal(mockFile);

    expect(result).toEqual({
      filename: 'file.png',
      originalName: 'file.png',
      mimetype: 'image/png',
      size: 1024,
      url: 'http://localhost:3000/uploads/file.png',
    });
  });

  it('should throw ConflictException if file is null in uploadLocal', () => {
    expect(() => service.uploadLocal(null as any)).toThrow(ConflictException);
  });


  it('should call S3client.send and return correct object for uploadFile', async () => {
    mockS3Client.send.mockResolvedValueOnce({});

    const result = await service.uploadFile(mockFile);

    expect(mockS3Client.send).toHaveBeenCalledTimes(1);
    expect(mockS3Client.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    expect(result).toHaveProperty('fileName');
    expect(result.size).toBe(1024);
    expect(result.type).toBe('image/png');
  });

});