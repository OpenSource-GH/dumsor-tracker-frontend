"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { continueWithGoogle } from "../../../actions/auth.actions";
import EmailSignUp from "./email-sign-up";
import PhoneSignUp from "./phone-sign-up";

function SignUpForm() {
  function signUpWithGoogle() {
    toast.success("Redirecting");
    continueWithGoogle();
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
            <EmailSignUp />
          </TabsContent>
          <TabsContent value="phone">
            <PhoneSignUp />
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
            onClick={signUpWithGoogle}
          >
            <FcGoogle />
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
