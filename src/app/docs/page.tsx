import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { articles } from "@/features/documentation/content";

export const metadata: Metadata = { title: "Docs" };

export default function DocsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Docs"
        title="Read the trade, then open the stage."
        lede="Install lines, the job each library is for, and the rules this bench used when it refused to fake a feature."
      />
      <ul className="mx-auto max-w-[720px] border-t border-border px-6 pb-16">
        {articles.map((article) => (
          <li key={article.slug} className="border-b border-border">
            <Link href={`/docs/${article.slug}`} className="block py-5">
              <span className="font-serif text-2xl">{article.title}</span>
              <span className="mt-2 block max-w-[62ch] text-sm text-foreground/65">{article.lede}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
