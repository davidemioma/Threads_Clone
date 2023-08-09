export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black flex items-center justify-center w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
}
