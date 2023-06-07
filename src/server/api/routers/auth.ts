// import { registerSchema } from "@/validation/auth";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { registerSchema } from "~/utils/authSchemas";

const SALT_ROUNDS = 10;

import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

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
