export default async function ProfilePage({
  params,
}: {
  params: { clerkId: string };
}) {
  const { clerkId } = params;

  return <div>Profile</div>;
}
