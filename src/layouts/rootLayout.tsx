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
        <meta 
        //add image for url
        // name="viewport" 
        // content="width=device-width, initial-scale=1" 
        />
      </Head>
      <div className="font-roboto">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
