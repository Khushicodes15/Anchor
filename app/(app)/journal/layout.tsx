import { ReactNode } from "react";

export default function JournalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      {children}
    </section>
  );
}

