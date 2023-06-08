/* eslint-disable @typescript-eslint/no-floating-promises */

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sendLoginEmail } from "~/utils/nodeMailer";

export const emailRouter = createTRPCRouter({

  sendLoginEmail: protectedProcedure.mutation(() => {
    sendLoginEmail();
    return true;
  }),

  userEmailVerificationStatus: protectedProcedure.query(({ ctx }) => {
    //only return user email verification status

    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
      select: {
        emailVerified: true,
      },
    });
  }),
  
});
