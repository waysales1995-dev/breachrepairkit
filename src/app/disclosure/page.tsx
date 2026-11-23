import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Learn how Breach Repair Kit may earn commissions through optional affiliate links and how to identify placeholder links.',
  alternates: { canonical: '/disclosure' },
};

export default function DisclosurePage() {
  return (
    <article className="container max-w-3xl py-12 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={15} />Home</Link>
      <div className="mt-8"><div className="kicker">Clear and upfront</div><h1 className="mt-3 text-4xl font-extrabold tracking-[-.045em] text-slate-950">Affiliate disclosure</h1><p className="mt-3 text-sm leading-6 text-slate-500">How optional product links may support this site.</p></div>
      <div className="prose prose-slate mt-8 max-w-none">
        <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6"><h2 className="text-lg font-bold text-blue-950">Some links may earn a commission</h2><p className="mt-2 text-sm leading-6 text-blue-950/80">Breach Repair Kit may use affiliate links. If you choose to click one and make a purchase, we may earn a commission at no additional cost to you. Affiliate relationships do not change the free troubleshooting steps or your checklist progress.</p></section>
        <h2 className="mt-8 text-xl font-bold text-slate-900">Placeholder links are not live recommendations</h2><p className="mt-2 text-sm leading-7 text-slate-600">This source package includes example.com placeholder destinations so the site owner can add approved partner links before launch. They are not active partner offers. Replace them in <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">src/data/affiliateConfig.ts</code> and review every product description before publishing.</p>
        <h2 className="mt-7 text-xl font-bold text-slate-900">Your repair plan does not depend on buying anything</h2><p className="mt-2 text-sm leading-7 text-slate-600">Tools are optional. We show built-in device settings and direct safety steps first. We do not claim that buying a product will prevent all scams or guarantee account recovery. Please compare terms, prices, and privacy practices directly with each provider.</p>
        <h2 className="mt-7 text-xl font-bold text-slate-900">External sites have their own policies</h2><p className="mt-2 text-sm leading-7 text-slate-600">When you leave this site, the destination may collect information under its own terms. We do not control third-party sites. A link does not imply an endorsement by the FTC, Apple, or any other source cited on this website.</p>
        <a href="https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:underline">FTC guidance on endorsements and disclosures<ExternalLink size={14} /></a>
      </div>
    </article>
  );
}
