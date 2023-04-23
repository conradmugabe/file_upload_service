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

app.use((res, req: any, next) => {
  console.log(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    console.log(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.post('/', async (req, res) => {
  const { contentType, userId } = req.body as {
    contentType: string;
    userId: string;
  };

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
