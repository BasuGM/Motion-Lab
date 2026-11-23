import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { articles, getArticle } from "@/features/documentation/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getArticle(slug)?.title ?? "Docs" };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const index = articles.findIndex((item) => item.slug === slug);

  return (
    <article className="mx-auto grid max-w-[1100px] gap-10 px-6 py-12 lg:grid-cols-[220px_minmax(0,68ch)]">
      <nav className="lg:sticky lg:top-20 lg:self-start" aria-label="Docs">
        <ul className="space-y-2 text-sm">
          {articles.map((item) => (
            <li key={item.slug}>
              <Link href={`/docs/${item.slug}`} className={item.slug === slug ? "text-signal-ink" : "text-foreground/65"}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Docs</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">{article.title}</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-foreground/75">{article.lede}</p>
        <div className="mt-8">
          <Accordion type="multiple" defaultValue={["section-0"]}>
            {article.sections.map((section, sectionIndex) => (
              <AccordionItem key={section.heading} value={`section-${sectionIndex}`}>
                <AccordionTrigger>{section.heading}</AccordionTrigger>
                <AccordionContent>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-3 max-w-[68ch] leading-relaxed text-foreground/80">
                      {paragraph}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-8 flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {articles[index - 1] ? <Link href={`/docs/${articles[index - 1].slug}`}>{articles[index - 1].title}</Link> : <span />}
          {articles[index + 1] ? <Link href={`/docs/${articles[index + 1].slug}`}>{articles[index + 1].title}</Link> : <span />}
        </div>
      </div>
    </article>
  );
}
