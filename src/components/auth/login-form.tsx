"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "./form-error";

import { signIn } from "next-auth/react";
import { LoadingSpinner } from "../ui/loading-spinner";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    // Check for error in URL query params
    const urlError = searchParams.get("error");
    if (urlError === "CredentialsSignin") {
      setError("Invalid email or password"); // Map the error to a user-friendly message
    }
  }, [searchParams]);
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          ...values,
          redirect: false,
        });
        if (result?.error) {
          setError("Invalid email or password");
        } else {
          const callbackUrl =
            searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
          router.push(callbackUrl);
        }
      } catch (e) {
        console.error(e);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account ?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="**********"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />

          <Button
            type="submit"
            className="relative flex w-full items-center justify-center"
            disabled={isPending}
          >
            {isPending && (
              <span className="absolute right-1/2 -translate-x-6">
                <LoadingSpinner />
              </span>
            )}
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
