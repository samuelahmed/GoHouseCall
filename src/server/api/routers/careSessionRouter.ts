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
        hourlyRate: z.number(),
        duration: z.number(),
        total: z.number(),
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

  //get all care sessions
  getAllCareSessions: protectedProcedure.query(async ({ ctx }) => {
    const allCareSessions = await ctx.prisma.hC_CareSession.findMany({
      select: {
        id: true,
        sessionType: true,
        description: true,
        status: true,
        city: true,
        date: true,
        startTime: true,
        duration: true,
        total: true,
      },
    });

    return allCareSessions;
  }),
  
  getCareSessionById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const careSession = await ctx.prisma.hC_CareSession.findUnique({
        where: {
          id: id,
        },
      });
      return careSession;
    }
  ),
});
