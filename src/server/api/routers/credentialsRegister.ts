import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { registerSchema } from "~/utils/authSchemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

const SALT_ROUNDS = 10;

export const credentialsRegister = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });
      if (exists) {
        throw new TRPCError({
          // need to figure out how to better tell client there is an error
          code: "CONFLICT",
          message: "This email is already in use",
        });
        return null;
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
