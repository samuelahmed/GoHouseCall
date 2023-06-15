import { createTRPCRouter } from "~/server/api/trpc";
import { settingsRouter } from "~/server/api/routers/settings";
import { credentialsRegisterRouter } from "~/server/api/routers/credentialsRegister";
import { emailRouter } from "./routers/emailRouter";
import { WelcomeFormRouter } from "./routers/welcomeFormRouter";
import { notificationsRouter } from "./routers/notifications";

export const appRouter = createTRPCRouter({
  settingsAPI: settingsRouter,
  credentialsRegisterAPI: credentialsRegisterRouter,
  emailAPI: emailRouter,
  WelcomeFormRouter: WelcomeFormRouter,
  NotificationsAPI: notificationsRouter,
});

export type AppRouter = typeof appRouter;
