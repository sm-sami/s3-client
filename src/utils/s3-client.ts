import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
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

  const response = await client.send(command);
  return listImagesSchema.parse(response.Contents);
};

export const uploadImage = async (key: string, file: any) => {
  const client = getS3Client();
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET,
    Key: key,
    Body: file,
    ACL: "public-read",
  });

  const res = await client.send(command);
  return res.$metadata.httpStatusCode;
};
