import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import ScamSimulator from '@/components/scam-shield/ScamSimulator';
import LockdownBlueprint from '@/components/scam-shield/LockdownBlueprint';
import { scamScenarios } from '@/data/scamScenarios';

export const metadata: Metadata = {
  title: 'Senior & Family Scam Shield — Practice, Prepare, Protect',
  description: 'Practice spotting fake bank texts, tech-support popups, and AI voice-cloning scams. Create a printable family device lockdown plan.',
  alternates: { canonical: '/scam-shield' },
};

export default function ScamShieldPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-[radial-gradient(ellipse_at_12%_0%,rgba(224,231,255,.8),transparent_48%),linear-gradient(180deg,#fff,#f8fafc)]">
        <div className="container py-12 sm:py-16"><div className="kicker"><ShieldCheck size={14} />Practice together, stay in control</div><h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-.05em] text-slate-950 sm:text-5xl">A little practice makes a big difference.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Help an older parent or relative spot the pressure tactics behind fake bank texts, tech-support popups, and AI voice-cloning calls—without making them feel foolish.</p><div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-600"><span className="rounded-full border border-slate-200 bg-white px-3 py-2">No real messages sent</span><span className="rounded-full border border-slate-200 bg-white px-3 py-2">No scary hacker imagery</span><span className="rounded-full border border-slate-200 bg-white px-3 py-2">Easy to print and revisit</span></div></div>
      </section>
      <section className="section-pad pb-12"><div className="container"><div className="mb-6"><h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Try a realistic example</h2><p className="mt-2 text-sm leading-6 text-slate-500">Every example is fictional and interactive. Tap the details to reveal what a scammer is trying to do.</p></div><ScamSimulator /></div></section>
      <section className="pb-14"><div className="container"><LockdownBlueprint /></div></section>
      <section className="border-y border-slate-200 bg-white py-14"><div className="container"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="kicker"><CheckCircle2 size={14} />Short guides for the family</div><h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Practice one scenario at a time.</h2></div><p className="max-w-md text-sm leading-6 text-slate-500">Use the simulator above, then talk through what your family would do next.</p></div><div className="mt-6 grid gap-3 md:grid-cols-3">{scamScenarios.map((scenario) => <Link key={scenario.slug} href={`/scam-shield/${scenario.slug}`} className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-card"><h3 className="text-base font-bold text-slate-900">{scenario.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{scenario.summary}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:gap-2">Read the guide<ArrowRight size={14} /></span></Link>)}</div></div></section>
    </>
  );
}
