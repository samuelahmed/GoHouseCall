/* eslint-disable @typescript-eslint/no-floating-promises */

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

    if (currentUser && currentUser.email) {
      sendLoginEmail(currentUser.email);
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
