"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createThread } from "@/actions/createThread";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadData, ThreadValidator } from "@/lib/validators/thread";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";

interface Props {
  userId: string;
}

const PostThread = ({ userId }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<ThreadData>({
    resolver: zodResolver(ThreadValidator),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: ThreadData) => {
    setLoading(true);

    try {
      await createThread({
        text: values.thread,
        authorId: userId,
        communityId: null,
      });

      router.refresh();

      router.push("/");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 mt-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-3">
              <FormLabel className="text-light-2 font-semibold">
                Content
              </FormLabel>

              <FormControl>
                <Textarea
                  className="bg-dark-3 border border-dark-4 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  rows={12}
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500" disabled={loading}>
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
