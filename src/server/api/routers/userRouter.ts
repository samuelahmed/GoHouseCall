import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  //gets user info for the current user
  //unused
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),

  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const user = await ctx.prisma.hC_Account.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          type: true,
          bio: true,
          image: true,
          city: true,
        },
      });
      return user;
    }),
});
