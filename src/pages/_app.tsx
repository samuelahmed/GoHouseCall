import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import RootLayout from "~/layouts/rootLayout";
import { Toaster } from "~/components/ui/toaster"


const MyApp: AppType<{ session: Session | null }> = ({
  
  Component,
  pageProps: { session, ...pageProps },
}) => {
  
  return (
    <SessionProvider session={session}>
      <RootLayout>
        <Component {...pageProps} />
        <Toaster />

      </RootLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
