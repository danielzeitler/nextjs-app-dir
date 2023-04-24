export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4">
      <h1 className="text-4xl my-6">Blog Page</h1>

      {children}
    </section>
  );
}
