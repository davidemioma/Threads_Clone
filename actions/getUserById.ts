import prismadb from "@/lib/prismadb";

export const getUserById = async (id: string) => {
  try {
    if (!id) return null;

    const user = await prismadb.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
};
