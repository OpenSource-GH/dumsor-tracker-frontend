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
import { Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  phone_number: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .regex(validators.PhoneNumberRegex),
});

function PhoneSignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone_number: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    toast("Data has been submitted");
    console.log(data);
    setIsSubmitting(false);
  }

  return (
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
        <Button type="submit" className="w-full items-center gap-3">
          {isSubmitting ? (
            <Loader width="20" height="20" color="orange" />
          ) : (
            <>
              <Phone />
              Sign in with Phone
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default PhoneSignIn;
