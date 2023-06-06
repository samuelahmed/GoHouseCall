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
      <div>
        <div className="relative min-h-screen">
          <Header />
          <main className="">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
