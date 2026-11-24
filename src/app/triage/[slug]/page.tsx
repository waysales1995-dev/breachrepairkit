import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertOctagon, ArrowRight, Eye, HelpCircle } from 'lucide-react';
import TriageWizard from '@/components/triage/TriageWizard';
import { getTriageScenario, triageScenarios } from '@/data/triageScenarios';

export const dynamicParams = false;

export function generateStaticParams() {
  return triageScenarios.map((scenario) => ({ slug: scenario.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scenario = getTriageScenario(slug);
  if (!scenario) return { title: 'Incident guide not found' };
  return {
    title: scenario.seoTitle,
    description: scenario.metaDescription,
    alternates: { canonical: `/triage/${scenario.slug}` },
    openGraph: {
      title: scenario.seoTitle,
      description: scenario.metaDescription,
      type: 'article',
      url: `https://breachresponsekit.com/triage/${scenario.slug}`,
    },
  };
}

export default async function TriageScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = getTriageScenario(slug);
  if (!scenario) notFound();

  const relatedScenarios = triageScenarios.filter((item) => item.slug !== scenario.slug).slice(0, 3);

  const faqSchema = scenario.seoGuide?.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: scenario.seoGuide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <TriageWizard scenario={scenario} />

      {scenario.seoGuide && (
        <section className="border-t border-slate-200 bg-white py-14 sm:py-16">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Understanding what happened &amp; what to avoid
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              {scenario.seoGuide.whatHappensSummary}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-rose-900">
                  <AlertOctagon size={16} className="text-rose-600" />
                  What NOT to do right now
                </h3>
                <ul className="mt-3 grid gap-2.5 text-sm leading-6 text-rose-950/85">
                  {scenario.seoGuide.doNotDo.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-amber-900">
                  <Eye size={16} className="text-amber-600" />
                  Common warning signs
                </h3>
                <ul className="mt-3 grid gap-2.5 text-sm leading-6 text-amber-950/85">
                  {scenario.seoGuide.commonRedFlags.map((flag) => (
                    <li key={flag} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {scenario.seoGuide.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  <HelpCircle size={20} className="text-blue-600" />
                  Frequently asked questions
                </h2>
                <div className="mt-5 grid gap-3">
                  {scenario.seoGuide.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 open:bg-white open:shadow-sm"
                    >
                      <summary className="cursor-pointer list-none text-base font-bold text-slate-900">
                        {faq.question}
                      </summary>
                      <p className="mt-2.5 text-sm leading-6 text-slate-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 border-t border-slate-200 pt-8">
              <h3 className="text-xs font-extrabold uppercase tracking-[.12em] text-slate-400">
                Related incident guides
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {relatedScenarios.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/triage/${related.slug}`}
                    className="group rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-white"
                  >
                    <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                      {related.heroHeadline}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-700">
                      Open guide <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
