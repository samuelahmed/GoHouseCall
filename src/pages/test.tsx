import { type NextPage } from "next";
import Head from "next/head";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const Test: NextPage = () => {
  const mutation = api.emailAPI.sendLoginEmail.useMutation();

  return (
    <>
      <Head>
        <title>Test</title>
        <meta
          name="description"
          content="Terms of Service Agreement of House Call"
        />
      </Head>
      <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
        <Button
          className="w-full"
          onClick={() => {
            mutation.mutate();
          }}
        >
          Send Login Email
        </Button>
      </div>
    </>
  );
};

export default Test;
