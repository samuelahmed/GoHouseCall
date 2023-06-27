import { createTRPCRouter } from "~/server/api/trpc";
import { settingsRouter } from "~/server/api/routers/settings";
import { credentialsRegisterRouter } from "~/server/api/routers/credentialsRegister";
import { emailRouter } from "./routers/emailRouter";
import { WelcomeFormRouter } from "./routers/welcomeFormRouter";
import { notificationsRouter } from "./routers/notifications";
import { imageRouter } from "./routers/imageRouter";
import { messagesRouter } from "./routers/messagesRouter";
import { careSessionRouter } from "./routers/careSessionRouter";

export const appRouter = createTRPCRouter({
  settingsAPI: settingsRouter,
  credentialsRegisterAPI: credentialsRegisterRouter,
  emailAPI: emailRouter,
  WelcomeFormRouter: WelcomeFormRouter,
  NotificationsAPI: notificationsRouter,
  imageAPI: imageRouter, 
  messagesAPI: messagesRouter,
  careSessionAPI: careSessionRouter,
});

export type AppRouter = typeof appRouter;
