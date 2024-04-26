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
import { validators } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is invalid.",
    })
    .optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .optional(),
  phone_number: z
    .string()
    .min(8, {
      message: "Phone number must be at least 10 characters.",
    })
    .regex(validators.PhoneNumberRegex)
    .optional(),
});

function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      phone_number: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Submit the data
    toast("Data has been submitted");
    console.log(data);
  }

  return (
    <div className='w-full h-full'>
      <div className='max-w-md mx-auto min-h-screen flex flex-col justify-center items-center px-6'>
        <div className='w-full mb-8'>
          <h3>Sign Up</h3>
          <p className='text-sm text-neutral-600 mt-2'>
            Already have an account?{" "}
            <span className='font-semibold text-black dark:text-white'>
              <Link href={`/sign-in`} className='hover:underline'>
                Sign In
              </Link>
            </span>
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type='email' />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                </FormItem>
              )}
            />
            <span className='relative flex justify-center'>
              <div className='absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75'></div>
              <span className='relative z-10 bg-background px-6'>
                <p className='text-sm text-neutral-500'>OR</p>
              </span>
            </span>
            <FormField
              control={form.control}
              name='phone_number'
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
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;
