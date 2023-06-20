import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  //gets user info for the current user
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
  
  //Add to friend_list
  createNewFriend: protectedProcedure
    .input(
      z.object({
        caregiverId: z.string(),
        patientId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const { patientId, caregiverId } = input;

      const createFriendList = await ctx.prisma.hC_FriendList.create({
        data: {
          userId: user.id,
          caregiverId: caregiverId,
          patientId: patientId,
        },
      });

      return createFriendList;
    }),








  //create message
  //read all current user pusher channels
  //read messages by channel
});
