import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const WelcomeFormRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
      },
    });
    return user;
  }),

  registerNewUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        type: z.string(),
        image: z.string(),
        name: z.string(),
        patientType: z.string(),
        email: z.string().email(),
        bio: z.string(),
        address: z.string(),
        city: z.string(),
        zip: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        userId,
        type,
        image,
        name,
        patientType,
        email,
        bio,
        address,
        city,
        zip,
      } = input;
      const registeredUser = await ctx.prisma.hC_Account.upsert({
        create: {
          userId: userId,
          type: type,
          image: image,
          name: name,
          patientType: patientType,
          email: email,
          bio: bio,
          address: address,
          city: city,
          zip: zip,
        },
        update: {
          userId: userId,
          type: type,
          image: image,
          name: name,
          patientType: patientType,
          email: email,
          bio: bio,
          address: address,
          city: city,
          zip: zip,
        },
        where: {

          // userId: ctx.session?.user?.id,
          // userId: userId,
          userId: ctx.session.user.id,


        },
        


      });
      return registeredUser;
    }),
});
