/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type { CredentialRegister } from "~/utils/authSchemas"
import { Button } from "../ui/button";
import { api } from "~/utils/api";

const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const mutation = api.credentialsRegister.register.useMutation({
    onError: (e) => setErrorMessage(e.message),
    onSuccess: () => router.push("/login"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialRegister>();

  const onSubmit: SubmitHandler<CredentialRegister> = async (data) => {
    setErrorMessage(undefined);
    await mutation.mutateAsync(data);
  };




  
  return (
    <div className="flex flex-col items-center gap-2 font-roboto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {errorMessage && (
          <p className="text-red11 text-center">Error! Please input complete information</p>
        )}
        <label>Username</label>
        {/* <input
          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
          type="username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="text-red11 text-center">Error! This field is required</p>
        )} */}
        <label>Email</label>
        <input
          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red11 text-center">Error! This field is required</p>
        )}
        <label>Password</label>
        <input
          className="block w-full border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11 dark:bg-darkBg"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red11 text-center">Error! This field is required</p>
        )}
        <div className="my-4 flex justify-center">
          <Button type="submit" variant="default" size="default">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;