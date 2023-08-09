import { ZodError } from "zod";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { UserValidator } from "@/lib/validators/user";

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { name, username, bio, profile_img } = UserValidator.parse(body);

    const userExists = await prismadb.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (!userExists) {
      await prismadb.user.create({
        data: {
          clerkId: userId,
          name,
          username: username.toLowerCase(),
          bio,
          image: profile_img,
        },
      });
    }

    await prismadb.user.update({
      where: {
        id: userExists?.id,
        clerkId: userId,
      },
      data: {
        name,
        username: username.toLowerCase(),
        bio,
        image: profile_img,
        onboarded: true,
      },
    });

    return NextResponse.json("User updated");
  } catch (err) {
    console.log("Update-profile", err);
    if (err instanceof ZodError) {
      return new NextResponse("Invalid parameters", { status: 422 });
    }

    return new NextResponse("Internal Error", { status: 500 });
  }
}
