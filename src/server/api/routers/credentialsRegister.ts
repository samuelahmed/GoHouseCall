import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { registerSchema } from "~/types/authSchemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

const SALT_ROUNDS = 10;

export const credentialsRegisterRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });
      if (exists) {
        // need to figure out how to better tell client there is an error
        throw new TRPCError({
          code: "CONFLICT",
          message: "This email is already in use",
        });
      }
      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const hash = bcrypt.hashSync(password, salt);
      const result = await ctx.prisma.user.create({
        data: { email, password: hash },
      });
      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
});
