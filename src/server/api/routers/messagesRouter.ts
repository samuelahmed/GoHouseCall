import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import Pusher from "pusher";
import { env } from "~/env.mjs";


const pusher = new Pusher({
  appId: env.APP_ID,
  key: env.APP_KEY,
  secret: env.APP_SECRET,
  cluster: env.APP_CLUSTER,
  useTLS: true,
});

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
      const existingChannel = await ctx.prisma.hC_FriendList.findFirst({
        where: {
          pusherChannelName: `${input.patientId}-${input.caregiverId}`,
        },
      });
      if (existingChannel) {
        throw new Error("Channel already exists");
      }

      const { patientId, caregiverId } = input;
      const createFriendList = await ctx.prisma.hC_FriendList.create({
        data: {
          userId: user.id,
          caregiverId: caregiverId,
          patientId: patientId,
          pusherChannelName: `${input.patientId}-${input.caregiverId}`,
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
          pusherChannelName: friend.pusherChannelName,
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
        pusherChannelName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.hC_Account.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const { content, receiverId, pusherChannelName } = input;
      
      const createMessage = await ctx.prisma.hC_Message.create({
        data: {
          senderId: user.id,
          receiverId: receiverId,
          userId: user.id,
          content: content,
          channelName: pusherChannelName,
        },
      });

      await pusher.trigger(pusherChannelName, "my-event", {
        message: content,
        senderId: user.userId,
        channelName: pusherChannelName,
        createdAt: new Date(),
        // senderName: senderName,
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



    readMessagesByChannel: protectedProcedure
    .input(
      z.object({
        channelName: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { channelName } = input;
      const messages = await ctx.prisma.hC_Message.findMany({
        where: {
          channelName: channelName,
        },
      });
      const messagesWithSenderNames = await Promise.all(
        messages.map(async (message) => {
          const sender = await ctx.prisma.user.findUnique({
            where: {
              id: message.senderId,
            },
          });
          return {
            ...message,
            senderName: sender?.name,
          };
        })
      );
      return messagesWithSenderNames;
    }),


  //read all current user pusher channels
  //read messages by channel
});
