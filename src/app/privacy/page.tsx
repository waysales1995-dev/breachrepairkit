import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, LockKeyhole } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Breach Response Kit handles quiz answers, checklist progress, and the optional family safe-word field.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <article className="container max-w-3xl py-12 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={15} />Home</Link>
      <div className="mt-8"><div className="kicker"><LockKeyhole size={14} />Private by design</div><h1 className="mt-3 text-4xl font-extrabold tracking-[-.045em] text-slate-950">Privacy policy</h1><p className="mt-3 text-sm leading-6 text-slate-500">Plain-language summary for this application.</p></div>
      <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><h2 className="text-base font-bold text-emerald-950">Your quiz answers stay in this browser</h2><p className="mt-2 text-sm leading-6 text-emerald-950/80">The triage answers and checklist progress are stored in your browser’s localStorage so you can return to them on this device. The application code does not send quiz answers or checklist state to a Breach Response Kit server. You can clear this information by clearing site data in your browser or using “Start over” on a triage guide.</p></div>
      <section className="mt-8"><h2 className="text-xl font-bold text-slate-900">Information you enter</h2><p className="mt-2 text-sm leading-7 text-slate-600">The quiz asks about the kind of incident and device, not your password, payment-card number, Social Security number, or one-time sign-in code. Do not enter sensitive account details into the site.</p><p className="mt-3 text-sm leading-7 text-slate-600">The optional family safe-word field is not written to localStorage or sent to a server. It remains on the page only while the page is open and can appear in a printout. Avoid printing the phrase unless you can keep the paper private and secure.</p></section>
      <section className="mt-7"><h2 className="text-xl font-bold text-slate-900">Third-party links and browser storage</h2><p className="mt-2 text-sm leading-7 text-slate-600">Links to government, device-maker, or optional product sites take you to services outside this application. Those providers use their own privacy policies and may collect information if you visit them. Optional affiliate links may use cookies or similar tracking after you leave this site; see our <Link className="font-semibold text-blue-700 underline" href="/disclosure">affiliate disclosure</Link>.</p></section>
      <section className="mt-7"><h2 className="text-xl font-bold text-slate-900">Hosting and operational logs</h2><p className="mt-2 text-sm leading-7 text-slate-600">This source package does not include analytics, an account system, advertising pixels, or a backend for quiz answers. The hosting provider may process basic request data needed to serve the website and maintain security. The site owner should review the chosen hosting provider’s terms and update this notice before launch if analytics, forms, or other services are added.</p></section>
      <section className="mt-7"><h2 className="text-xl font-bold text-slate-900">Changes and questions</h2><p className="mt-2 text-sm leading-7 text-slate-600">If the application changes how information is handled, revise this policy before deployment. This page is a product privacy summary, not legal advice.</p></section>
    </article>
  );
}
