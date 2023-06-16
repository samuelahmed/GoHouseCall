import { createTRPCRouter } from "~/server/api/trpc";
import { settingsRouter } from "~/server/api/routers/settings";
import { credentialsRegisterRouter } from "~/server/api/routers/credentialsRegister";
import { emailRouter } from "./routers/emailRouter";
import { WelcomeFormRouter } from "./routers/welcomeFormRouter";
import { notificationsRouter } from "./routers/notifications";
import { imageRouter } from "./routers/imageRouter";

export const appRouter = createTRPCRouter({
  settingsAPI: settingsRouter,
  credentialsRegisterAPI: credentialsRegisterRouter,
  emailAPI: emailRouter,
  WelcomeFormRouter: WelcomeFormRouter,
  NotificationsAPI: notificationsRouter,
  imageAPI: imageRouter, 
});

export type AppRouter = typeof appRouter;
