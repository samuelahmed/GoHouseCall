// import Navbar from './navbar';
// import Footer from './footer';

//This is the main layout for the app
//It will be used to wrap all the pages

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar /> */}
      <main className="bg-yellow-500">{children}</main>
      {/* <Footer /> */}
    </>
  );
}