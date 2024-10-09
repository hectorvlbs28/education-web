import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { AwsType } from '../../../config/types/aws.type';
import { IAwsService } from '../../domain/interfaces/aws-service.interface';

@Injectable()
export class AwsService implements IAwsService {
  private connection: S3Client;
  private bucket: string;

  constructor(private readonly config: ConfigService) {
    const { accessKey, bucketName, secretKey } =
      this.config.get<AwsType>('aws');
    this.bucket = bucketName;
    this.connection = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });
  }

  public async putFile(
    key: string,
    body: Buffer
  ): Promise<PutObjectCommandOutput> {
    const uploadFile = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: body,
    });

    return this.connection.send(uploadFile);
  }

  public async getUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.connection, command);
  }
}
