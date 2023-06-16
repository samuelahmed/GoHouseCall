/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { env } from "~/env.mjs";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";


const region = "us-west-1";
const bucketName = "hc-aws-bucket-profile-images";
const accessKeyId = env.AWS_ACCESS_KEY_ID;
const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;

// console.log(accessKeyId)
// const endpoint = "http://localhost:3000"


const s3 = new S3Client({

  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  
  
  // securityToken: env.AWS_SESSION_TOKEN,


  // endpoint: bucketName,
  // endpoint: endpoint,
  // forcePathStyle: true,

  region,



  // credentials: {
    // accessKeyId: accessKeyId,
    // secretAccessKey: secretAccessKey,
  // },
  // signatureVersion: "v4",
});

const UPLOAD_MAX_FILE_SIZE = 1000000;


//code to connect to S3 bucket
// const imageName = "test.jpg";

export const imageRouter = createTRPCRouter({
  //get secure url from the server
  // createPresignedUrl: protectedProcedure
  // url, fields

  createUploadUrl: protectedProcedure

    .input(z.object({ imageName: z.string() }))

    .mutation(async ({ ctx, input }) => {
      const { imageName } = input;

      // const user = await ctx.prisma.user.findUnique({
      //   where: {
      //     id: ctx.session.user.id,
      //   },
      // });

      const createPresignedUrl = await createPresignedPost(s3, {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60,

        // Fields: {
        //   key: imageName,
        // },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
        ],
      });

      console.log(createPresignedUrl);
      return createPresignedUrl;
      // return createPresignedPost(s3, {
      //   Bucket: bucketName,
      //   Key: imageName,
      //   Expires: 60 * 60,
      // }
      // // console.log(createPresignedPost(s3, {)
      // );
    }),
});
