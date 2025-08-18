export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10 space-y-p-6 container mx-auto max-w-2xl">
      {children}
    </div>
  );
}
