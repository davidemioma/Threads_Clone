"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { UserValidator, UserData } from "@/lib/validators/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { updateUser } from "@/actions/updateUser";

interface Props {
  user: {
    id: string | undefined | null;
    clerkId: string;
    username: string | undefined | null;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const router = useRouter();

  const pathname = usePathname();

  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<UserData>({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      profile_img: user.image || "",
    },
  });

  const fileHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: UserData) => {
    setLoading(true);

    try {
      const blob = values.profile_img;

      const hasImageChanged = isBase64Image(blob);

      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].fileUrl) {
          values.profile_img = imgRes[0].fileUrl;
        }
      }

      await updateUser(values);

      router.refresh();

      if (pathname === "/profile/edit") {
        router.back();
      } else {
        router.push("/");
      }
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
        className="flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="profile_img"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>
                {field.value ? (
                  <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden">
                    <Image
                      className="object-cover"
                      src={field.value}
                      fill
                      alt="profile_icon"
                    />
                  </div>
                ) : (
                  <div className="relative w-6 h-6 overflow-hidden">
                    <Image
                      className="object-cover"
                      src="/assets/profile.svg"
                      fill
                      alt="profile_icon"
                    />
                  </div>
                )}
              </FormLabel>

              <FormControl className="flex-1 font-semibold text-gray-200">
                <Input
                  className="bg-transparent border-none outline-none cursor-pointer file:text-blue"
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  placeholder="Add profile photo"
                  onChange={(e) => fileHandler(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-3">
              <FormLabel className="text-light-2 font-semibold">Name</FormLabel>

              <FormControl>
                <Input
                  className="bg-dark-3 border border-dark-4 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  type="text"
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-3">
              <FormLabel className="text-light-2 font-semibold">
                Username
              </FormLabel>

              <FormControl>
                <Input
                  className="bg-dark-3 border border-dark-4 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  type="text"
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-3">
              <FormLabel className="text-light-2 font-semibold">Bio</FormLabel>

              <FormControl>
                <Textarea
                  className="bg-dark-3 border border-dark-4 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  rows={9}
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500" disabled={loading}>
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
