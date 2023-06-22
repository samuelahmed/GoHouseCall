import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  //gets user info for the current user
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.hC_Account.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return user;
  }),
  getUserImage: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const user = await ctx.prisma.hC_Account.findUnique({
        where: {
          userId: userId,
        },
        select: {
          image: true,
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

  //get all friends by name
  getFriends: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const friendList = await ctx.prisma.hC_FriendList.findMany({
      where: {
        OR: [
          { userId: user.id },
          { caregiverId: user.id },
          { patientId: user.id },
        ],
      },
    });
    const friendsName = await Promise.all(
      friendList.map(async (friend) => {
        const caregiver = await ctx.prisma.hC_Account.findUnique({
          where: {
            userId: friend.caregiverId || undefined,
          },
        });
        const patient = await ctx.prisma.hC_Account.findUnique({
          where: {
            userId: friend.patientId || undefined,
          },
        });
        return {
          id: caregiver?.userId,
          caregiverName: caregiver?.name,
          patientName: patient?.name,
        };
      })
    );
    return friendsName;
  }),

  //create message
  createMessage: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        receiverId: z.string(),
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

      const { content, receiverId } = input;
      const createMessage = await ctx.prisma.hC_Message.create({
        data: {
          senderId: user.id,
          receiverId: receiverId,
          userId: user.id,
          content: content,
        },
      });
      return createMessage;
    }),

  //read all messages by user
  readAllMessagesBySelectedUser: protectedProcedure
    .input(
      z.object({
        receiverId: z.string(),
        senderId: z.string(),
      })
    )

    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const { receiverId, senderId } = input;
      const readAllMessages = await ctx.prisma.hC_Message.findMany({
        where: {
          OR: [{ receiverId: receiverId }, { senderId: senderId }],
        },
      });
      return readAllMessages;
    }),

  //read all current user pusher channels
  //read messages by channel
});
