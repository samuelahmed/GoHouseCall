import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const settingsRouter = createTRPCRouter({


  userHC_Account: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.hC_Account.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return user;
  }),



  updateUser: protectedProcedure
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
        welcomeFormComplete: z.boolean(),
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
        welcomeFormComplete,
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
          welcomeFormComplete: welcomeFormComplete,
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
          welcomeFormComplete: welcomeFormComplete,
        },
        where: {
          userId: ctx.session.user.id,
        },
      });
      return registeredUser;
    }),
});
