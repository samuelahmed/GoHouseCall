import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type PrismaClient } from "@prisma/client";

//Used to route users to / from welcome form based on whether or not they have completed it
//using getserversideprops and hc_account table
const getUserInputSchema = z.object({
  userId: z.string(),
});
type getUserInput = z.infer<typeof getUserInputSchema>;

export async function checkIfWelcomeFormComplete({
  prisma,
  input,
}: {
  prisma: PrismaClient;
  input: getUserInput;
}) {
  const user = await prisma.hC_Account.findUnique({
    where: {
      userId: input.userId,
    },
    select: {
      welcomeFormComplete: true,
    },
  });
  return user;
}

export const WelcomeFormRouter = createTRPCRouter({
  //Get user data for welcome form
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

  // checkIfWelcomeFormComplete: protectedProcedure.query(async ({ ctx }) => {
  //   const user = await ctx.prisma.hC_Account.findUnique({
  //     where: {
  //       userId: ctx.session.user.id,
  //     },
  //     select: {
  //       welcomeFormComplete: true,
  //     },
  //   });
  //   const welcomeFormComplete = user?.welcomeFormComplete;
  //   return user;
  // }),

  //Create or update HC_Account table with welcome form data
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
