import { createTRPCRouter } from "~/server/api/trpc";
import { settingsRouter } from "~/server/api/routers/settings";
import { credentialsRegister } from "~/server/api/routers/credentialsRegister";

export const appRouter = createTRPCRouter({
  settings: settingsRouter,
  credentialsRegister: credentialsRegister,
});

export type AppRouter = typeof appRouter;
