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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "This is a required field.",
  }),
  location: z.string().min(1, {
    message: "This is a required field.",
  }),
  comment: z.string().min(1, {
    message: "This is a required field.",
  }),
});
function CreateLogForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="my-8 w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase tracking-tight font-bold text-sm text-[#535753]">
                  Title
                  <Separator
                    orientation="horizontal"
                    className="w-12 mt-1.5 bg-[#D9D9D9] mb-2"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a title for your post"
                    {...field}
                    variant="large"
                    className="placeholder:text-[#E4E7EC]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-tight font-bold text-sm text-[#535753]">
                    Location
                    <Separator
                      orientation="horizontal"
                      className="w-20 mt-1.5 bg-[#D9D9D9] mb-2"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add Location"
                      {...field}
                      className="placeholder:text-[#E4E7EC]"
                      variant="large"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-[#4E5BA6]">
                    Which area is this post about?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-tight font-bold text-sm text-[#535753]">
                    Your comment
                    <Separator
                      orientation="horizontal"
                      className="w-32 mt-1.5 bg-[#D9D9D9] mb-2"
                    />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What more do you have to add? Be concise and respectful."
                      id="message"
                      {...field}
                      className="h-32 placeholder:text-[#E4E7EC]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size={"lg"}
            className="tracking-wide uppercase w-full my-4"
          >
            Post my update
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateLogForm;
