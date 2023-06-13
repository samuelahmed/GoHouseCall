import { randomUUID } from "crypto";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sendLoginEmail } from "~/utils/nodeMailer";

export const emailRouter = createTRPCRouter({
  sendConfirmationEmail: protectedProcedure.mutation(async ({ ctx }) => {
    const currentUser = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
    });
    const subject = `Welcome to House Call ${currentUser?.name || ""}!`;
    if (currentUser && currentUser.email) {
      const token = await ctx.prisma.verificationToken.findFirst({
        where: {
          userId: currentUser.id,
        },
      });
      if (token) {
        await sendLoginEmail(currentUser.email, token.token, subject);
        return true;
      }
      const createToken = await ctx.prisma.verificationToken.create({
        data: {
          userId: currentUser.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });
      await sendLoginEmail(currentUser.email, createToken.token, subject);
      return true;
    }
    return false;
  }),

  userEmailVerificationStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        emailVerified: true,
        email: true,
      },
    });
    return user;
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
