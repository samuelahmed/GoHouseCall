/* eslint-disable @typescript-eslint/no-floating-promises */

import { randomUUID } from "crypto";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sendLoginEmail } from "~/utils/nodeMailer";

export const emailRouter = createTRPCRouter({
  //triggered by a button on the welcomeForm
  sendConfirmationEmail: protectedProcedure.mutation(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
    });
    if (currentUser && currentUser.email) {
      const token = await ctx.prisma.verificationToken.findFirst({
        where: {
          userId: currentUser.id,
        },
      });
      if (token) {
        sendLoginEmail(currentUser.email, token.token);
        return true;
      }
      const createToken = await ctx.prisma.verificationToken.create({
        data: {
          userId: currentUser.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });
      sendLoginEmail(currentUser.email, createToken.token);
      return true;
    }
    return false;
  }),

  userEmailVerificationStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      //only return the emailVerified field
      select: {
        emailVerified: true,
        email: true,
      },
    });
    return user 
  }),

   checkVerificationToken: protectedProcedure.query(async ({ ctx }) => {
    const verificationToken = await ctx.prisma.verificationToken.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return verificationToken;
  }),



});
