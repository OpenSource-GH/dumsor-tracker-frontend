"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { validators } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import { continueWithGoogle } from "../../../actions/auth.actions";

const FormSchema = z.object({
  phone_number: z
    .string()
    .min(8, {
      message: "Phone number must be at least 10 characters.",
    })
    .regex(validators.PhoneNumberRegex)
    .optional(),
});


function SignUpForm() {
  const [isLoadingOAuth, setIsLoadingOAuth] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone_number: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Data has been submitted");
    console.log(data);
  }

  function signUpWithGoogle(){
    setIsLoadingOAuth(true)
    continueWithGoogle()
    setIsLoadingOAuth(false)
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center items-center px-6">
        <div className="w-full">
          <h3>Sign Up</h3>
          <p className="text-sm text-neutral-600 mt-2">
            Already have an account?{" "}
            <span className="font-semibold text-black dark:text-white">
              <Link href={`/sign-in`} className="hover:underline">
                Sign In
              </Link>
            </span>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full my-6">
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    We will send an OTP to this number for verification.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <div className="w-full">
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 bg-background px-6">
              <p className="text-sm text-neutral-500">OR</p>
            </span>
          </span>
          <div className="mt-6">
            <Button
              variant={"outline"}
              type="button"
              className="w-full items-center gap-3"
              onClick={signUpWithGoogle}
            >
              {isLoadingOAuth ? (
                <Loader width="20" height="20" color="orange" />
              ) : (
                <>
                  <FcGoogle />
                  Sign up with Google
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
