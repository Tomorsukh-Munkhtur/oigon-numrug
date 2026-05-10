const links = [
  {
    title: "Линк 1",
    href: "https://example.com",
  },
  {
    title: "Линк 2",
    href: "https://example.org",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
      <section className="w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold">Нүүр хуудас</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.href}
              className="flex h-12 items-center justify-center rounded-md border border-foreground/15 px-5 text-sm font-medium transition hover:border-foreground/30 hover:bg-foreground hover:text-background"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
