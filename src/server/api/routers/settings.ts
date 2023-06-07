import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  readCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
    });
  }),
});
