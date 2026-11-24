import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { triageScenarios } from '@/data/triageScenarios';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.25fr_1fr_1fr] md:py-16">
        <div>
          <Link href="/" className="flex w-fit items-center gap-2 text-sm font-extrabold tracking-tight"><ShieldCheck className="text-blue-600" size={22} />Breach Response Kit</Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">A calm place to figure out what happened and take the next useful step. Free to use, no account required.</p>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500"><span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />Your quiz answers stay in this browser. We are not an emergency service or a substitute for your bank, device maker, or law enforcement.</p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Incident guides</h2>
          <ul className="mt-4 grid gap-2.5">
            {triageScenarios.map((scenario) => <li key={scenario.slug}><Link className="text-sm text-slate-600 hover:text-blue-700" href={`/triage/${scenario.slug}`}>{scenario.heroHeadline}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Family & transparency</h2>
          <ul className="mt-4 grid gap-2.5 text-sm text-slate-600">
            <li><Link className="hover:text-blue-700" href="/scam-shield">Senior & family scam shield</Link></li>
            <li><Link className="hover:text-blue-700" href="/editorial-policy" className="hover:text-slate-900">Editorial Policy</Link>
            <Link href="/disclosure">Affiliate disclosure</Link></li>
            <li><Link className="hover:text-blue-700" href="/privacy">Privacy policy</Link></li>
            <li><a className="inline-flex items-center gap-1 hover:text-blue-700" href="https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams" target="_blank" rel="noreferrer">FTC phishing guidance <ArrowUpRight size={13} /></a></li>
            <li><a className="inline-flex items-center gap-1 hover:text-blue-700" href="https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams" target="_blank" rel="noreferrer">FTC tech-support scams <ArrowUpRight size={13} /></a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4"><div className="container flex flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Breach Response Kit</span><span>Clear next steps. No panic. No account needed.</span></div></div>
    </footer>
  );
}
