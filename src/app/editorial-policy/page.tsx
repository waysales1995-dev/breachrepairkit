import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Policy & Verification Standards',
  description:
    'How Breach Response Kit verifies consumer cybersecurity checklists against official FTC, CISA, FBI IC3, and platform recovery documentation.',
  alternates: { canonical: '/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <article className="container max-w-3xl py-12 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900">
        <ArrowLeft size={15} />
        Home
      </Link>

      <div className="mt-8">
        <div className="kicker">
          <ShieldCheck size={14} />
          Accuracy &amp; trust standards
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-.045em] text-slate-950">
          Editorial policy &amp; verification standards
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Last reviewed: November 2026 · Built for calm, accurate consumer incident recovery.
        </p>
      </div>

      <div className="prose prose-slate mt-8 max-w-none">
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-emerald-950">Built-in official recovery channels always come first</h2>
          <p className="mt-2 text-sm leading-6 text-emerald-950/85">
            Every triage checklist on Breach Response Kit prioritizes free, first-party actions before recommending any third-party tool—including calling the phone number printed on the back of your bank card, freezing credit files directly with Equifax, Experian, and TransUnion, and using official Apple, Google, or carrier account recovery portals.
          </p>
        </section>

        <h2 className="mt-8 text-xl font-bold text-slate-900">Primary authoritative sources we reference</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Our recovery workflows and family scam simulations are cross-referenced against public consumer protection and cybersecurity advisories, including:
        </p>
        <ul className="mt-3 grid gap-2.5 text-sm text-slate-700">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="mt-1 shrink-0 text-blue-600" />
            <span><strong>Federal Trade Commission (FTC):</strong> Consumer Advice on phishing, smishing, impersonation scams, and official identity-theft recovery plans at IdentityTheft.gov.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="mt-1 shrink-0 text-blue-600" />
            <span><strong>Cybersecurity &amp; Infrastructure Security Agency (CISA):</strong> Guidance on phishing-resistant multi-factor authentication (FIDO2/passkeys) and device hygiene.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="mt-1 shrink-0 text-blue-600" />
            <span><strong>FBI Internet Crime Complaint Center (IC3):</strong> Public service announcements on toll-road smishing, delivery impersonation, and wire/payment-app fraud reporting.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="mt-1 shrink-0 text-blue-600" />
            <span><strong>Platform Security Documentation:</strong> Official account recovery and session-revocation steps published by Apple, Google, Microsoft, Meta, and major US financial institutions.</span>
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-bold text-slate-900">Zero scareware &amp; strict affiliate separation</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          We never use fake virus warnings, countdown timers, or exaggerated risk scores to pressure visitors into buying software. Optional tool and hardware recommendations are reviewed independently for relevance to the specific recovery step and are clearly labeled in accordance with our{' '}
          <Link href="/disclosure" className="font-semibold text-blue-700 hover:underline">
            affiliate disclosure
          </Link>
          .
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-blue-700">
          <a href="https://www.identitytheft.gov/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
            FTC IdentityTheft.gov <ExternalLink size={14} />
          </a>
          <a href="https://www.ic3.gov/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
            FBI IC3 Reporting <ExternalLink size={14} />
          </a>
          <a href="https://www.cisa.gov/secure-our-world" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
            CISA Secure Our World <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
