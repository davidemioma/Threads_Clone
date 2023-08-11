"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentData, CommentValidator } from "@/lib/validators/comment";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { createComment } from "@/actions/createComment";

interface Props {
  userId: string;
  threadId: string;
  currentUserImage: string;
}

const CommentForm = ({ userId, threadId, currentUserImage }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<CommentData>({
    resolver: zodResolver(CommentValidator),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: CommentData) => {
    setLoading(true);

    try {
      await createComment({
        text: values.thread,
        authorId: userId,
        threadId,
        communityId: null,
      });

      toast.success("Comment successfully added");

      form.reset();

      router.refresh();
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
        className="flex flex-col md:flex-row items-start md:items-center gap-4 py-5 border-y border-y-dark-4"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row gap-3">
              <FormLabel>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    className="object-cover"
                    src={currentUserImage}
                    fill
                    alt=""
                  />
                </div>
              </FormLabel>

              <FormControl>
                <Input
                  className="bg-transparent text-light-1 text-lg border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  type="text"
                  placeholder="Comment..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full md:w-fit bg-primary-500 rounded-3xl py-2 px-4 md:px-8"
          disabled={loading}
        >
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
