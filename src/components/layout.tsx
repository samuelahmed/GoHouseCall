// import Navbar from './navbar';
// import Footer from './footer';


// export default function RootLayout({
  //   children,
  // }: {
  //   children: React.ReactNode;
  // }) {
  //   return (
  //     <html lang="en">
  //       <body className="bg-yellow-300">{children}</body>
  //     </html>
  //   );
  // }



 
export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <>
      {/* <Navbar /> */}
      <main className="bg-yellow-500">{children}</main>
      {/* <Footer /> */}
    </>
  );
}