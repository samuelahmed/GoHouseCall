// "use client";
/* eslint-disable @typescript-eslint/no-misused-promises */

import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CredentialRegister } from "~/types/authSchemas";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const mutation = api.credentialsRegisterAPI.register.useMutation({
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSuccess: () => {
      void router.push("/signin");
    }
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
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {errorMessage && (
            <p className="text-sm text-red11">
              Account creation failed, try again!
            </p>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-red11">This field is required</p>
            )}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-sm text-red11">This field is required</p>
            )}
          </div>
          <Button variant="outline" type="submit" disabled={isLoading}>
            {isLoading && <></>}
            Create Account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        onClick={() => signIn("google")}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? <> </> : <> </>}
        Google
      </Button>
    </div>
  );
}
