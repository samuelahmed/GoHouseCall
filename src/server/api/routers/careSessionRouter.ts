import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const careSessionRouter = createTRPCRouter({
  //gets user info for the current user
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.hC_Account.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return user;
  }),

  //create new care session
  createNewCareSession: protectedProcedure
    .input(
      z.object({
        status: z.string(),
        userId: z.string(),
        date: z.date(),
        startTimeAsDate: z.date(),
        endTimeAsDate: z.date(),
        startTime: z.string(),
        endTime: z.string(),
        sessionType: z.string(),
        title: z.string(),
        description: z.string(),
        hourlyRate: z.string(),
        duration: z.string(),
        total: z.string(),
        address: z.string(),
        city: z.string(),
        zip: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        status,
        userId,
        date,
        startTimeAsDate,
        endTimeAsDate,
        startTime,
        endTime,
        sessionType,
        title,
        description,
        hourlyRate,
        duration,
        total,
        address,
        city,
        zip,
      } = input;
      const newCareSession = await ctx.prisma.hC_CareSession.create({
        data: {
          status: status,
          userId: userId,
          date: date,
          startTimeAsDate: startTimeAsDate,
          endTimeAsDate: endTimeAsDate,
          startTime: startTime,
          endTime: endTime,
          sessionType: sessionType,
          title: title,
          description: description,
          hourlyRate: hourlyRate,
          duration: duration,
          total: total,
          address: address,
          city: city,
          zip: zip,
        },
      });
      return newCareSession;
    }),
});
