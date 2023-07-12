import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const careSessionRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.hC_Account.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return user;
  }),

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

  cancelCareSession: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, userId } = input;
      const findCareSession = await ctx.prisma.hC_CareSession.findUnique({
        where: {
          id: id,
        },
      });
      if (findCareSession?.userId !== userId) {
        throw new Error("You are not authorized to cancel this care session");
      }
      const cancelledCareSession = await ctx.prisma.hC_CareSession.update({
        where: {
          id: id,
        },
        data: {
          status: "cancelled",
        },
      });
      return cancelledCareSession;
    }),

  activateCareSession: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, userId } = input;
      const findCareSession = await ctx.prisma.hC_CareSession.findUnique({
        where: {
          id: id,
        },
      });
      if (findCareSession?.userId !== userId) {
        throw new Error("You are not authorized to activate this care session");
      }
      const activatedCareSession = await ctx.prisma.hC_CareSession.update({
        where: {
          id: id,
        },
        data: {
          status: "new",
        },
      });
      return activatedCareSession;
    }),

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

  getAllCareSessionsCaregiver: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const sessionApplications =
        await ctx.prisma.hC_SessionApplication.findMany({
          where: {
            userId: userId,
          },
        });

      if (sessionApplications.length === 0) {
        throw new Error("No care sessions found");
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-return
      const sessionIds = sessionApplications.map(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (app: { careSessionId: any }) => app.careSessionId
      );

      const allCareSessions = await ctx.prisma.hC_CareSession.findMany({
        where: {
          id: {
            in: sessionIds,
          },
        },
      });

      // Map the applicationStatus to each corresponding care session
      const careSessionsWithApplicationStatus = allCareSessions.map(
        (careSession) => {
          const correspondingApplication = sessionApplications.find(
            (app) => app.careSessionId === careSession.id
          );
          if (!correspondingApplication)
            throw new Error("No corresponding application found");

          return {
            ...careSession,
            applicationStatus: correspondingApplication.applicationStatus,
          };
        }
      );

      return careSessionsWithApplicationStatus;
    }),

  getCareSessionsByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const careSessions = await ctx.prisma.hC_CareSession.findMany({
        where: {
          userId: userId,
        },
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
      return careSessions;
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
    }),

  applyToCareSession: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string(), note: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, userId, note } = input;
      const findSessionApplication =
        await ctx.prisma.hC_SessionApplication.findFirst({
          where: {
            careSessionId: id,
            userId: userId,
          },
        });

      if (
        findSessionApplication &&
        findSessionApplication.applicationStatus === "cancelled"
      ) {
        const newSessionApplication =
          await ctx.prisma.hC_SessionApplication.update({
            where: {
              id: findSessionApplication.id,
            },
            data: {
              applicationStatus: "pending",
              note: note,
            },
          });
        return newSessionApplication;
      }

      const newSessionApplication =
        await ctx.prisma.hC_SessionApplication.create({
          data: {
            careSessionId: id,
            userId: userId,
            applicationStatus: "pending",
            note: note,
          },
        });
      return newSessionApplication;
    }),

  cancelApplication: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, userId } = input;
      const findSessionApplication =
        await ctx.prisma.hC_SessionApplication.findFirst({
          where: {
            careSessionId: id,
            userId: userId,
          },
        });

      if (!findSessionApplication) {
        throw new Error("You have not applied to this care session");
      }

      const cancelledSessionApplication =
        await ctx.prisma.hC_SessionApplication.update({
          where: {
            id: findSessionApplication.id,
          },
          data: {
            applicationStatus: "cancelled",
          },
        });
      return cancelledSessionApplication;
    }),

  hasCaregiverApplied: protectedProcedure
    .input(z.object({ careSessionId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { careSessionId, userId } = input;
      const findSessionApplication =
        await ctx.prisma.hC_SessionApplication.findFirst({
          where: {
            careSessionId: careSessionId,
            userId: userId,
            applicationStatus: "pending" || "accepted",
          },
        });

      if (findSessionApplication) {
        return true;
      }
      return false;
    }),

  careSessionApplications: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { sessionId } = input;
      const sessionApplications =
        await ctx.prisma.hC_SessionApplication.findMany({
          where: {
            careSessionId: sessionId,
          },
        });
      if (sessionApplications.length === 0) {
        throw new Error("No applications found");
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const userIds = sessionApplications.map((app) => app.userId!);
      const users = await ctx.prisma.hC_Account.findMany({
        where: {
          userId: {
            in: userIds,
          },
        },
      });
      const sessionApplicationsWithUsers = sessionApplications.map(
        (sessionApplicant) => {
          const user = users.find(
            (user) => user.userId === sessionApplicant.userId
          );
          return {
            ...sessionApplicant,
            user,
          };
        }
      );
      return sessionApplicationsWithUsers;
    }),
});
