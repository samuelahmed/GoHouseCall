import { Header } from "./header";
import { Footer } from "./footer";

// import Footer from './footer';

//This is the main layout for the app
//It will be used to wrap all the pages

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="">{children}</main>
      <Footer />
    </>
  );
}
