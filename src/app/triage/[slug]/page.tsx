import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import TriageWizard from '@/components/triage/TriageWizard';
import { getScenarioBySlug, triageScenarios } from '@/data/triageScenarios';

export const dynamicParams = false;

export function generateStaticParams() {
  return triageScenarios.map((scenario) => ({ slug: scenario.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);
  if (!scenario) return { title: 'Checklist not found' };
  return {
    title: scenario.title,
    description: scenario.heroSubheadline,
    keywords: scenario.searchKeywords,
    alternates: { canonical: `/triage/${scenario.slug}` },
    openGraph: {
      title: scenario.title,
      description: scenario.heroSubheadline,
      url: `https://breachresponsekit.com/triage/${scenario.slug}`,
    },
  };
}

export default async function TriageScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = getScenarioBySlug(slug);
  if (!scenario) notFound();

  const currentIndex = triageScenarios.findIndex((s) => s.slug === scenario.slug);
  const relatedScenarios = [
    triageScenarios[(currentIndex + 1) % triageScenarios.length],
    triageScenarios[(currentIndex + 2) % triageScenarios.length],
    triageScenarios[(currentIndex + 3) % triageScenarios.length],
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: scenario.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="container max-w-4xl py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft size={15} />
          All situations
        </Link>
        <Link
          href="/editorial-policy"
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
        >
          <CheckCircle2 size={13} />
          Verified against FTC &amp; CISA guidance · Nov 2026
        </Link>
      </div>

      <header className="mt-7">
        <div className="kicker">
          <ShieldAlert size={14} />
          {scenario.badgeText}
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-[-.04em] text-slate-950 sm:text-5xl">
          {scenario.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{scenario.heroSubheadline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {triageScenarios.map((item) => (
            <Link
              key={item.slug}
              href={`/triage/${item.slug}`}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                item.slug === scenario.slug
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-slate-950'
              }`}
            >
              {item.shortLabel}
            </Link>
          ))}
        </div>
      </header>

      <div className="mt-8">
        <TriageWizard initialSlug={scenario.slug} />
      </div>

      <section className="card mt-8 p-5 sm:p-7">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Common questions</h2>
        <div className="mt-4 divide-y divide-slate-100">
          {scenario.faqs.map((faq) => (
            <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
              <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-extrabold text-slate-900">Related incident recovery checklists</h2>
          <Link href="/scam-shield" className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">
            Explore Family Scam Shield <ArrowRight size={13} />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {relatedScenarios.map((rel) => (
            <Link
              key={rel.slug}
              href={`/triage/${rel.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700">{rel.categoryLabel}</span>
              <p className="mt-1 text-sm font-bold text-slate-900">{rel.shortLabel}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{rel.heroSubheadline}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
