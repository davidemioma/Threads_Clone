import prismadb from "@/lib/prismadb";

export const getUserByClerkId = async (id: string) => {
  try {
    if (!id) return null;

    const user = await prismadb.user.findFirst({
      where: {
        clerkId: id,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
};
