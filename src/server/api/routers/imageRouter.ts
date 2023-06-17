import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { env } from "~/env.mjs";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const region = "us-west-1";
const bucketName = "hc-aws-bucket-profile-images";
const accessKeyId = env.AWS_ACCESS_KEY_ID;
const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
  region,
});

const UPLOAD_MAX_FILE_SIZE = 5000000;

export const imageRouter = createTRPCRouter({
  createUploadUrl: protectedProcedure
    .input(z.object({ imageName: z.string() }))
    .mutation(async ({ input }) => {
      const { imageName } = input;
      const createPresignedUrl = await createPresignedPost(s3, {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60,
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
        ],
      });
      return createPresignedUrl;
    }),

  newProfileImage: protectedProcedure
    .input(z.object({ imageName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { imageName } = input;
      // const check if user has HC_Account or User
      const HC_Account = await ctx.prisma.hC_Account.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });
      console.log('HCACCOUNT', HC_Account)
      //this is triggered at welcomeForm
      if (!HC_Account) {
        const newProfileImage = await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            image2: `https://hc-aws-bucket-profile-images.s3.us-west-1.amazonaws.com/${imageName}`,
          },
        });
        return newProfileImage;
        //all other places
      } else {
        const newProfileImage = await ctx.prisma.hC_Account.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            image: `https://hc-aws-bucket-profile-images.s3.us-west-1.amazonaws.com/${imageName}`,
          },
        });
        return newProfileImage;
      }
    }),
});
