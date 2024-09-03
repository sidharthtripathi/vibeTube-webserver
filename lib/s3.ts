import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import {v4 as uuid} from 'uuid'
const s3 = new S3Client({
  region: process.env.AWSREGION,
  credentials : {
    accessKeyId: process.env.AWSACCESSKEYID as string,
    secretAccessKey: process.env.AWSSECRETACCESSKEY as string
  }

})


const bucketName = process.env.BUCKETNAME;

export async function getPutSignedURL(key: string = uuid()) {
  try {
    const cmd = new PutObjectCommand({
      Bucket : bucketName,
      Key : `metatube/${key}`,
      ContentType : 'video/mp4'
      
    })
    const preSignedUrl = await getSignedUrl(s3,cmd);
    return {preSignedUrl,uploadedAt : `https://${bucketName}.s3.${process.env.AWSREGION}.amazonaws.com/hls/${key}/playlist.m3u8`};
  } catch (error) {
    throw error;
  }
}