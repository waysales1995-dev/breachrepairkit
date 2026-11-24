import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Learn how Breach Response Kit may earn commissions through optional affiliate and Amazon Associates links.',
  alternates: { canonical: '/disclosure' },
};

export default function DisclosurePage() {
  return (
    <article className="container max-w-3xl py-12 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={15} />Home</Link>
      <div className="mt-8"><div className="kicker">Clear and upfront</div><h1 className="mt-3 text-4xl font-extrabold tracking-[-.045em] text-slate-950">Affiliate disclosure</h1><p className="mt-3 text-sm leading-6 text-slate-500">How optional product and hardware links support this free resource.</p></div>
      <div className="prose prose-slate mt-8 max-w-none">
        <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-blue-950">Some links may earn a commission</h2>
          <p className="mt-2 text-sm leading-6 text-blue-950/80">Breach Response Kit participates in consumer security affiliate programs and the Amazon Services LLC Associates Program. As an Amazon Associate I earn from qualifying purchases. If you choose to click a partner link and make a purchase, we may earn a commission at no additional cost to you.</p>
        </section>
        <h2 className="mt-8 text-xl font-bold text-slate-900">Your repair plan does not depend on buying anything</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">Every diagnostic checklist and family scam simulator on Breach Response Kit is 100% free. Optional tool recommendations appear only where relevant to a recovery step, and we always show built-in device settings and official bank or government recovery channels first.</p>
        <h2 className="mt-7 text-xl font-bold text-slate-900">Editorial independence</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">Affiliate partnerships never alter the order of emergency steps, your checklist progress, or our safety guidance. We do not claim that purchasing any software or hardware guarantees immunity from scams or breaches. Always review terms, pricing, and privacy policies directly with each provider.</p>
        <h2 className="mt-7 text-xl font-bold text-slate-900">External sites have their own policies</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">When you leave this site, the destination may collect information under its own terms and use cookies to attribute referrals. A link does not imply an endorsement by the FTC, Apple, Google, or any government agency cited on this website.</p>
        <a href="https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:underline">FTC guidance on endorsements and disclosures<ExternalLink size={14} /></a>
      </div>
    </article>
  );
}
