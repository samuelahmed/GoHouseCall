import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { stat } from "fs";

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
      const canceledCareSession = await ctx.prisma.hC_CareSession.update({
        where: {
          id: id,
        },
        data: {
          status: "canceled",
        },
      });
      return canceledCareSession;
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
        title: true,
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

  //for patient
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
          title: true,
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

  //for patient
  getScheduledCareSessionsByUserId: protectedProcedure.query(
    async ({ ctx }) => {
      const careSessions = await ctx.prisma.hC_CareSession.findMany({
        where: {
          userId: ctx.session.user.id,
          status: "scheduled",
        },

        select: {
          id: true,
          sessionType: true,
          title: true,
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
    }
  ),

  //for caregiver
  getScheduledCareSessionByCaregiverId: protectedProcedure.query(
    async ({ ctx }) => {
      const careSessions = await ctx.prisma.hC_CareSession.findMany({
        where: {
          HC_SessionApplication: {
            some: {
              userId: ctx.session.user.id,
              applicationStatus: "accepted",
              HC_CareSession: {
                status: "scheduled",
              },
            },
          },
        },
      });
      return careSessions;
    }
  ),

  //for patient
  getMonthyEarnings: protectedProcedure.query(async ({ ctx }) => {
    const careSessions = await ctx.prisma.hC_CareSession.findMany({
      where: {
        userId: ctx.session.user.id,
        status: "completed",
      },
      select: {
        total: true,
      },
    });

    const earnings = careSessions.reduce((acc, curr) => {
      if (!curr.total) return acc;

      return acc + curr.total;
    }, 0);

    return {
      earnings,
    };
  }),

  //for patient
  getTotalMonthlyHoursOfCare: protectedProcedure.query(async ({ ctx }) => {
    const careSessions = await ctx.prisma.hC_CareSession.findMany({
      where: {
        userId: ctx.session.user.id,
        status: "completed",
      },
      select: {
        duration: true,
      },
    });

    const hoursOfCare = careSessions.reduce((acc, curr) => {
      if (!curr.duration) return acc;

      return acc + curr.duration;
    }, 0);

    return {
      hoursOfCare,
    };
  }),

  //for caregiver
  getCaregiverMonthlyEarnings: protectedProcedure.query(async ({ ctx }) => {
    const thisMonth = new Date().getMonth();

    const careSessions = await ctx.prisma.hC_CareSession.findMany({
      where: {
        HC_SessionApplication: {
          some: {
            userId: ctx.session.user.id,
            applicationStatus: "accepted",
            HC_CareSession: {
              status: "completed",
            },
          },
        },
      },
      select: {
        total: true,
        date: true,
      },
    });

    const completedSession = careSessions.filter((session) => {
      if (session.date && session.date.getMonth() === thisMonth) {
        return true;
      }
      return false;
    });

    const earnings = completedSession.reduce((acc, curr) => {
      if (!curr.total) return acc;

      return acc + curr.total;
    }, 0);

    return {
      earnings,
    };
  }),

  //for caregiver
  getCaregiverMonthlyCompletedSessions: protectedProcedure.query(
    async ({ ctx }) => {
      const thisMonth = new Date().getMonth();

      const careSessions = await ctx.prisma.hC_CareSession.findMany({
        where: {
          HC_SessionApplication: {
            some: {
              userId: ctx.session.user.id,
              applicationStatus: "accepted",
              HC_CareSession: {
                status: "completed",
              },
            },
          },
        },
      });

      const completedSession = careSessions.filter((session) => {
        if (
          session.date &&
          session.date.getMonth() === thisMonth &&
          session.status === "completed"
        ) {
          return true;
        }
        return false;
      });
      return completedSession.length;
    }
  ),

  //for caregiver
  getCaregiverMonthlyScheduledSessions: protectedProcedure.query(
    async ({ ctx }) => {
      const thisMonth = new Date().getMonth();

      const careSessions = await ctx.prisma.hC_CareSession.findMany({
        where: {
          HC_SessionApplication: {
            some: {
              userId: ctx.session.user.id,
              applicationStatus: "accepted",
              HC_CareSession: {
                status: "scheduled",
              },
            },
          },
        },
      });

      const scheduledSession = careSessions.filter((session) => {
        if (session.date && session.date.getMonth() === thisMonth) {
          return true;
        }
        return false;
      });
      return scheduledSession.length;
    }
  ),

  //for caregiver
  getCaregiverMonthlyAppliedSessions: protectedProcedure.query(
    async ({ ctx }) => {
      const thisMonth = new Date().getMonth();

      const careSessions = await ctx.prisma.hC_CareSession.findMany({
        where: {
          HC_SessionApplication: {
            some: {
              userId: ctx.session.user.id,
              applicationStatus: "pending",
            },
          },
        },
      });

      const appliedSessions = careSessions.filter((session) => {
        if (session.date && session.date.getMonth() === thisMonth) {
          return true;
        }
        return false;
      });
      return appliedSessions.length;
    }
  ),

  //for patient
  getMonthlySessionInfo: protectedProcedure.query(async ({ ctx }) => {
    const thisMonth = new Date().getMonth();

    const careSessions = await ctx.prisma.hC_CareSession.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        date: true,
        status: true,
      },
    });

    const completedSession = careSessions.filter((session) => {
      if (
        session.date &&
        session.date.getMonth() === thisMonth &&
        session.status === "completed"
      ) {
        return true;
      }
      return false;
    });

    const scheduledSession = careSessions.filter((session) => {
      if (
        session.date &&
        session.date.getMonth() === thisMonth &&
        session.status === "scheduled"
      ) {
        return true;
      }
      return false;
    });

    const createdSession = careSessions.filter((session) => {
      if (session.date && session.date.getMonth()) {
        return true;
      }
      return false;
    });

    const completedSessions = completedSession.length;
    const scheduledSessions = scheduledSession.length;
    const createdSessions = createdSession.length;

    return {
      completedSessions,
      scheduledSessions,
      createdSessions,
    };
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
        findSessionApplication.applicationStatus === "canceled"
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

      const canceledSessionApplication =
        await ctx.prisma.hC_SessionApplication.update({
          where: {
            id: findSessionApplication.id,
          },
          data: {
            applicationStatus: "canceled",
          },
        });
      return canceledSessionApplication;
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

  acceptCaregiver: protectedProcedure
    .input(z.object({ applicationId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { applicationId, userId } = input;
      const acceptedCaregiver = await ctx.prisma.hC_SessionApplication.update({
        where: {
          id: applicationId,
        },
        data: {
          applicationStatus: "accepted",
        },
      });
      return acceptedCaregiver;
    }),

  cancelOtherApplications: protectedProcedure
    .input(z.object({ applicationId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { applicationId, userId } = input;
      const canceledApplications =
        await ctx.prisma.hC_SessionApplication.updateMany({
          where: {
            id: {
              not: applicationId,
            },
            userId: {
              not: userId,
            },
          },
          data: {
            applicationStatus: "canceled",
          },
        });
      return canceledApplications;
    }),

  updateCareSessionStatus: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { sessionId } = input;

      const updatedCareSession = await ctx.prisma.hC_CareSession.update({
        where: {
          id: sessionId,
        },
        data: {
          status: "scheduled",
        },
      });
      return updatedCareSession;
    }),
});
