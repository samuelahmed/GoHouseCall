import { type NextPage } from "next";
import Head from "next/head";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for House Call users." />
      </Head>
      <div className="h-screen">
        {/* <MessagesLayout /> */}
        dashboard
      </div>
    </>
  );
};

export default Dashboard;
