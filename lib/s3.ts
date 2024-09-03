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

export async function getPutSignedURL(contentType:"video/mp4"|"image/jpeg",key: string = uuid(),) {
  try {
    const cmd = new PutObjectCommand({
      Bucket : bucketName,
      Key : contentType==="video/mp4"? `metatube/${key}` : `thumbnail/${key}`,
      ContentType : contentType
      
    })
    const preSignedUrl = await getSignedUrl(s3,cmd);
    if(contentType==="video/mp4")
    return {
      preSignedUrl,
      rawVideoUrl : `https://${bucketName}.s3.${process.env.AWSREGION}.amazonaws.com/metatube/${key}`,
      hlsVideoUrl : `https://${bucketName}.s3.${process.env.AWSREGION}.amazonaws.com/hls/${key}/playlist.m3u8`
    };
    else return {
      preSignedUrl,
      thumbnailUrl : `https://${bucketName}.s3.${process.env.AWSREGION}.amazonaws.com/thumbnail/${key}`,
    }
  } catch (error) {
    throw error;
  }
}