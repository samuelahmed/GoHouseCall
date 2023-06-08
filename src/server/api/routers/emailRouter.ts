/* eslint-disable @typescript-eslint/no-floating-promises */

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sendLoginEmail } from "~/utils/nodeMailer";

export const emailRouter = createTRPCRouter({

  sendLoginEmail: protectedProcedure.mutation(() => {
    sendLoginEmail();
    return true;
  }),
  
});
