"use client";

import { continueWithPhoneNumber } from "@/app/actions/auth.actions";
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
import { normalizeSupabaseError } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone_number: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      await continueWithPhoneNumber({ phone: data.phone_number });
      form.reset();
      router.push(`/verify-otp/${data.phone_number}`);
    } catch (e: any) {
      toast.error(`${normalizeSupabaseError((e as Error)?.message)}`);
      console.error((e as Error)?.message);
    } finally {
      setIsSubmitting(false);
    }
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
