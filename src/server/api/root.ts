import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { settingsRouter } from "~/server/api/routers/settings";
import { credentialsRegister } from "~/server/api/routers/credentialsRegister";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  settings: settingsRouter,
  credentialsRegister: credentialsRegister,
});

// export type definition of API
export type AppRouter = typeof appRouter;
