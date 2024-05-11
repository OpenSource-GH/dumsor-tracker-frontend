"use client";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getCurrentDate,
  getCurrentFormattedTime,
  getCurrentTime,
} from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateLogs } from "@/app/actions/logs.actions";
import Loader from "@/components/ui/loader";

const formSchema = z.object({
  location: z.string().min(1, {
    message: "This is a required field.",
  }),
  timeOff: z.string().min(1, {
    message: "This is a required field.",
  }),
  timeBackOn: z.string().min(1, {
    message: "This is a required field.",
  }),
});

type Props = {
  id: string;
  location: string;
  timeBackOn: any;
  timeOff: any;
};

function UpdateLogForm({ id, location, timeOff, timeBackOn }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);
  const date = getCurrentDate();
  const time = getCurrentTime();
  const formattedTime = getCurrentFormattedTime();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: location,
      timeOff: timeOff,
      timeBackOn: timeBackOn,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = { values, id };
    setIsSubmitting(true);
    try {
      await updateLogs(payload);
      toast.success("Log Updated!");

      // revalidatePath("/");
      router.push("/?page=1");
    } catch (e) {
      toast.error("Failed to update log");
      console.error((e as Error)?.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="my-8 w-full h-full">
      <BackButton />
      <div className="w-full mb-8">
        <h3>Update power outage</h3>
        <div className="flex justify-start items-center gap-2">
          <p className="text-sm text-neutral-500">{date}</p>◦
          <p className="text-sm text-neutral-500">{time}</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-sm">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your location"
                    {...field}
                    className="placeholder:text-neutral-500"
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeOff"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-sm">
                  Time of Outage
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    className="placeholder:text-neutral-500"
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeBackOn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-sm">
                  Time of Restoration
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    className="placeholder:text-neutral-500"
                    value={currentTime ? formattedTime : ""}
                    disabled={currentTime}
                  />
                </FormControl>
                <br />
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={currentTime}
                    onCheckedChange={() => setCurrentTime(!currentTime)}
                  />
                  <p className="text-sm">Use current time</p>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size={"lg"}
            className="tracking-wide uppercase w-full my-4"
          >
            {isSubmitting ? (
              <Loader width="20" height="20" color="orange" />
            ) : (
              <>Update Log</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateLogForm;
