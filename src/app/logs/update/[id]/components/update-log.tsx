"use client";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getCurrentDate, getCurrentTime } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
};

function UpdateLogForm({ id }: Props) {
  const date = getCurrentDate();
  const time = getCurrentTime();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      timeOff: "",
      timeBackOn: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, id);
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
                  />
                </FormControl>
                <br />
                <div className="flex items-center gap-3">
                  <Checkbox />
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
            Update Log
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateLogForm;
