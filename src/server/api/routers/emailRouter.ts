/* eslint-disable @typescript-eslint/no-floating-promises */

import { randomUUID } from "crypto";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sendLoginEmail } from "~/utils/nodeMailer";

export const emailRouter = createTRPCRouter({
  //if the current user has an email, send them a confirmation email
  //triggered by a button on the client
  sendConfirmationEmail: protectedProcedure.mutation(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
    });

    //check that there is a user with email
    if (currentUser && currentUser.email) {
      //check if there is already a token
      const token = await ctx.prisma.verificationToken.findFirst({
        where: {
          userId: currentUser.id,
        },
      });
      if (token) {
        sendLoginEmail(currentUser.email, token.token);
        return true;
      }

      //if no token, create one and send email
      const createToken = await ctx.prisma.verificationToken.create({
        data: {
          userId: currentUser.id,

          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });
      console.log(createToken);
      sendLoginEmail(currentUser.email, createToken.token);
      return true;
    }
    return false;
  }),

  //this should check if the user has verified their email
  //currently only gets all user info.
  userEmailVerificationStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    return user;
  }),
});
