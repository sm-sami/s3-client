import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  AWS_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET,
} from "./config";
import { listImagesSchema } from "@/utils/schema";

let client: S3Client;

export const getS3Client = (): S3Client => {
  if (!client) {
    client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return client;
};

export const getImages = async () => {
  const client = getS3Client();
  const command = new ListObjectsCommand({
    Bucket: AWS_BUCKET,
  });

  const res = await client.send(command);
  return listImagesSchema.parse(res.Contents);
};

export const createPreSignedUrl = async (key: string) => {
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET,
    Key: key,
    ACL: "public-read",
  });

  // @ts-ignore
  return getSignedUrl(getS3Client(), command, { expiresIn: 3600 });
};
