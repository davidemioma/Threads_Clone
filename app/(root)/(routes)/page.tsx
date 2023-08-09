import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return <div>Home</div>;
}
