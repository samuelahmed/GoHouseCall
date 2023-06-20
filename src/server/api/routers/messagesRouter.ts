import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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



  //create pusher channel
  //create message
  //read all current user pusher channels 
  //read messages by channel 







});
