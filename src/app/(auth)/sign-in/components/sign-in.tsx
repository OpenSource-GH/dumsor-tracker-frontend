"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { continueWithGoogle } from "../../../actions/auth.actions";
import EmailSignIn from "./email-sign-in";
import PhoneSignIn from "./phone-sign-in";

function SignInForm() {
  function signInWithGoogle() {
    toast.success("Redirecting");
    continueWithGoogle();
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center items-center px-6">
        <div className="w-full">
          <h3>Sign In</h3>
          <p className="text-sm text-neutral-600 mt-2">
            Don&apos;t have an account?{" "}
            <span className="font-semibold text-black dark:text-white">
              <Link href={`/sign-up`} className="hover:underline">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
        <Tabs defaultValue="email" className="w-full my-6">
          <TabsList className="w-full">
            <TabsTrigger value="email" className="w-full">
              Email
            </TabsTrigger>
            <TabsTrigger value="phone" className="w-full">
              Phone
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <EmailSignIn />
          </TabsContent>
          <TabsContent value="phone">
            <PhoneSignIn />
          </TabsContent>
        </Tabs>
        <div className="w-full">
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 bg-background px-6">
              <p className="text-sm text-neutral-500">OR</p>
            </span>
          </span>
        </div>
        <div className="w-full mt-6">
          <Button
            variant={"outline"}
            type="button"
            className="w-full items-center gap-3"
            onClick={signInWithGoogle}
          >
            <FcGoogle />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
