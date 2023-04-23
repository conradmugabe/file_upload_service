import { v4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

export default class AwsS3Service {
  private client: S3Client;

  constructor(config: S3ClientConfig) {
    this.client = new S3Client(config);
  }

  getSignedUrl = async ({
    bucketName,
    contentType,
    userId,
  }: AwsS3Service.GetSignedUrl) => {
    const contentTypeList = contentType.split('/');
    const fileType = contentTypeList[contentTypeList.length - 1];
    const key = `${userId}/${v4()}.${fileType}`;

    const putObjectParams = {
      Bucket: bucketName,
      ContentType: contentType,
      Key: key,
    };

    const command = new PutObjectCommand(putObjectParams);
    const signedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });
    return { signedUrl, key };
  };
}

namespace AwsS3Service {
  export type GetSignedUrl = {
    bucketName: string;
    contentType: string;
    userId: string;
  };
}
