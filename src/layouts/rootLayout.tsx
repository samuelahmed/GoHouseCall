import { Header } from "./header";
import { Footer } from "./footer";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/faviconLarge.png" />
      </Head>
      <div 
      // className="font-roboto"
      >
        <Header />
        <main className="min-h-screen overflow-hidden">{children}</main>
        <Footer />
      </div>
    </>
  );
}
