import { createTRPCRouter } from "~/server/api/trpc";
import { settingsRouter } from "~/server/api/routers/settings";
import { credentialsRegisterRouter } from "~/server/api/routers/credentialsRegister";
import { emailRouter } from "./routers/emailRouter";

export const appRouter = createTRPCRouter({
  settingsAPI: settingsRouter,
  credentialsRegisterAPI: credentialsRegisterRouter,
  emailAPI: emailRouter
});

export type AppRouter = typeof appRouter;
