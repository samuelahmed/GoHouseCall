import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const notificationsRouter = createTRPCRouter({
  userHC_Notifications: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.hC_Notifications.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return user;
  }),

  updateNotifications: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        messageNotifications: z.boolean(),
        messageFrequency: z.string(),
        sessionApplications: z.boolean(),
        payments: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        userId,
        messageNotifications,
        messageFrequency,
        sessionApplications,
        payments,
      } = input;
      const updatedNotifications = await ctx.prisma.hC_Notifications.upsert({
        create: {
          userId: userId,
          messageNotifications: messageNotifications,
          messageFrequency: messageFrequency,
          sessionApplications: sessionApplications,
          payments: payments,
        },
        update: {
          userId: userId,
          messageNotifications: messageNotifications,
          messageFrequency: messageFrequency,
          sessionApplications: sessionApplications,
          payments: payments,
        },
        where: {
          userId: ctx.session.user.id,
        },
      });
      return updatedNotifications;
    }),
});
