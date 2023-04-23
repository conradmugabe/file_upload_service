import 'dotenv/config';
import express from 'express';
import AwsS3Service from './storage/aws-s3.service';

const app = express();
const PORT = 4000;

const accessKeyId = process.env.S3_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || '';
const region = process.env.S3_BUCKET_REGION || '';
const bucketName = process.env.S3_BUCKET_NAME || '';

const storageService = new AwsS3Service({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.post('/', async (req, res) => {
  const contentType = 'jpeg';
  const userId = '12';

  const { signedUrl, key } = await storageService.getSignedUrl({
    bucketName,
    contentType,
    userId,
  });

  return res.send({ signedUrl, key });
});

app.listen(PORT, () => {
  console.log(`[PORT-${PORT}] Server started`);
});
