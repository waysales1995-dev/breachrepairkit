import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import ScamSimulator from '@/components/scam-shield/ScamSimulator';
import { getScamScenario, scamScenarios } from '@/data/scamScenarios';

export const dynamicParams = false;

export function generateStaticParams() {
  return scamScenarios.map((scenario) => ({ slug: scenario.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scenario = getScamScenario(slug);
  if (!scenario) return { title: 'Scam guide not found' };
  return { title: scenario.seoTitle, description: scenario.metaDescription, alternates: { canonical: `/scam-shield/${scenario.slug}` }, openGraph: { title: scenario.seoTitle, description: scenario.metaDescription, type: 'article' } };
}

export default async function ScamScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = getScamScenario(slug);
  if (!scenario) notFound();
  return (
    <div className="container py-10 sm:py-14">
      <Link href="/scam-shield" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={15} />Senior & family scam shield</Link>
      <div className="mt-8 max-w-3xl"><div className="kicker"><ShieldCheck size={14} />Practice & prevention guide</div><h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-.045em] text-slate-950 sm:text-4xl">{scenario.title}</h1><p className="mt-3 text-base leading-7 text-slate-600">{scenario.summary}</p></div>
      <div className="mt-8"><ScamSimulator initialTab={scenario.initialTab} /></div>
      <div className="mt-7 grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-amber-100 bg-amber-50 p-5"><h2 className="flex items-center gap-2 text-sm font-bold text-amber-950"><span className="h-2 w-2 rounded-full bg-amber-500" />What to remember</h2><p className="mt-2 text-sm leading-6 text-amber-950/80">{scenario.lesson}</p></div><div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950"><CheckCircle2 size={15} />A safer response</h2><p className="mt-2 text-sm leading-6 text-emerald-950/80">{scenario.safeResponse}</p></div></div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><h2 className="text-lg font-bold text-slate-900">Make a family plan</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Practice these steps together while there is no pressure. Choose a trusted call-back number, decide who to contact, and agree on what to do if someone asks for money.</p><Link href="/scam-shield#lockdown-blueprint" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline">Open the printable lockdown blueprint<ArrowLeft className="rotate-180" size={15} /></Link></div>
    </div>
  );
}
