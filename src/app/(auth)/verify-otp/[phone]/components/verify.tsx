"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { verifyPhoneNumber } from "@/app/actions/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import Loader from "@/components/ui/loader";
import { normalizeSupabaseError } from "@/utils/errors";

const OTPFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { phone } = useParams();

  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof OTPFormSchema>) {
    setIsSubmitting(true);
    try {
      await verifyPhoneNumber({
        pin: data.pin,
        phone: typeof phone === "string" ? phone : phone[0],
      });
      form.reset();
    } catch (e: any) {
      toast.error(`${normalizeSupabaseError((e as Error)?.message)}`);
      console.error((e as Error)?.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP className="w-full" maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-[66px] h-20 text-xl" />
                    <InputOTPSlot index={1} className="w-[66px] h-20 text-xl" />
                    <InputOTPSlot index={2} className="w-[66px] h-20 text-xl" />
                    <InputOTPSlot index={3} className="w-[66px] h-20 text-xl" />
                    <InputOTPSlot index={4} className="w-[66px] h-20 text-xl" />
                    <InputOTPSlot index={5} className="w-[66px] h-20 text-xl" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="">
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.getValues()["pin"] || isSubmitting}
          type="submit"
          className="w-full items-center gap-3"
        >
          {isSubmitting ? (
            <Loader width="20" height="20" color="orange" />
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>
    </Form>
  );
}

function VerifyOTPForm() {
  return (
    <div className="w-full h-full">
      <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center items-center px-6 space-y-6">
        <div className="w-full">
          <h3>Verify Phone</h3>
        </div>
        <div className="w-full">
          <InputOTPForm />
        </div>
      </div>
    </div>
  );
}

export default VerifyOTPForm;
