import { createTRPCRouter } from "~/server/api/trpc";
import { settingsRouter } from "~/server/api/routers/settings";
import { credentialsRegisterRouter } from "~/server/api/routers/credentialsRegister";

export const appRouter = createTRPCRouter({
  settingsAPI: settingsRouter,
  credentialsRegisterAPI: credentialsRegisterRouter,
});

export type AppRouter = typeof appRouter;
