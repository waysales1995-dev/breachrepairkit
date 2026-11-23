import Link from 'next/link';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BellRing, Check, Clock3, LockKeyhole, MailWarning, Package, ShieldCheck, Smartphone, Sparkles, Landmark, Link2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { triageScenarios } from '@/data/triageScenarios';
import SpotlightCard from '@/components/ui/SpotlightCard';

const icons: Record<string, LucideIcon> = { link: Link2, bell: BellRing, package: Package, phone: Smartphone, bank: Landmark, mail: MailWarning };
const riskLabels = ['Link opened', 'Login alert', 'Delivery text', 'Phone issue', 'Bank text', 'Email access'];

function InterceptDiagram() {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_24px_65px_rgba(15,23,42,.10)] sm:p-7">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="relative flex items-center justify-between"><div><span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-blue-700"><Sparkles size={11} />A clearer next step</span><h2 className="mt-3 text-lg font-bold tracking-tight text-slate-900">From uncertainty to a plan</h2></div><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><ShieldCheck size={21} /></div></div>
      <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50/90 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between"><span className="text-[10px] font-extrabold uppercase tracking-[.11em] text-slate-400">When a message feels urgent</span><span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Pause first</span></div>
        <div className="grid grid-cols-[1fr_30px_1fr_30px_1fr] items-center gap-1">
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center"><div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Smartphone size={18} /></div><p className="mt-2 text-[11px] font-bold text-slate-800">You</p><p className="mt-0.5 text-[10px] text-slate-400">Unexpected text</p></div>
          <div className="flex items-center justify-center text-amber-400"><ArrowRight size={18} /></div>
          <div className="relative rounded-xl border border-amber-200 bg-amber-50 p-3 text-center"><div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-amber-600"><MailWarning size={18} /></div><p className="mt-2 text-[11px] font-bold text-amber-950">Suspicious link</p><p className="mt-0.5 text-[10px] text-amber-800/70">Do not tap</p><span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white"><ArrowDownRight size={12} /></span></div>
          <div className="flex items-center justify-center text-emerald-500"><ArrowRight size={18} /></div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center"><div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-600"><LockKeyhole size={18} /></div><p className="mt-2 text-[11px] font-bold text-emerald-950">Trusted app</p><p className="mt-0.5 text-[10px] text-emerald-800/70">Verify safely</p></div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white px-3.5 py-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check size={16} strokeWidth={3} /></div><p className="text-xs leading-5 text-slate-600"><strong className="text-slate-900">No panic. No guessing.</strong> Answer a few questions and get a checklist matched to what happened.</p></div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold text-slate-500"><span className="inline-flex items-center gap-1.5"><LockKeyhole size={13} className="text-emerald-600" />Private by default</span><span className="inline-flex items-center gap-1.5"><Clock3 size={13} className="text-blue-600" />A few quick questions</span><span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-emerald-600" />No account needed</span></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(ellipse_at_20%_0%,rgba(219,234,254,.68),transparent_45%),linear-gradient(180deg,#fff_0%,#f8fafc_100%)]">
        <div className="container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.04fr_.96fr] lg:gap-10 lg:py-24">
          <div>
            <div className="kicker"><span className="h-2 w-2 rounded-full bg-blue-600" />Your digital emergency room</div>
            <h1 className="display-title mt-5 max-w-2xl text-slate-950">Think you were hacked or scammed?<span className="block text-blue-600">Let’s lock things down.</span></h1>
            <p className="body-lg mt-5 max-w-xl">Tell us what happened. Get a clear, private action plan for the next few minutes—without jargon, blame, or another account to create.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3"><Link href="#scenarios" className="btn-primary">Start a quick check<ArrowRight size={17} /></Link><Link href="/scam-shield" className="btn-secondary">Protect a parent<ArrowUpRight size={15} /></Link></div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-sm"><LockKeyhole size={14} />100% free & private · no account required</div>
          </div>
          <InterceptDiagram />
        </div>
      </section>

      <section className="section-pad" id="scenarios">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><div className="kicker"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Start with what happened</div><h2 className="section-title mt-3 max-w-2xl text-slate-950">Choose the situation that feels closest.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">You don’t need to know what kind of scam it is. Pick a symptom and we’ll help you sort the next steps.</p></div>
            <Link href="#triage" className="hidden items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 sm:inline-flex">How this works<ArrowDownRight size={16} /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {triageScenarios.map((scenario, index) => {
              const Icon = icons[scenario.icon];
              const colors = ['bg-blue-50 text-blue-700', 'bg-violet-50 text-violet-700', 'bg-amber-50 text-amber-700', 'bg-cyan-50 text-cyan-700', 'bg-rose-50 text-rose-700', 'bg-indigo-50 text-indigo-700'];
              return <Link key={scenario.slug} href={`/triage/${scenario.slug}`} className="group block rounded-[22px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
                <SpotlightCard className="card h-full rounded-[22px] p-5 transition duration-200 group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-[0_18px_45px_rgba(37,99,235,.10)] sm:p-6">
                  <div className="flex items-start justify-between gap-3"><span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colors[index]}`}><Icon size={20} /></span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">{riskLabels[index]}</span></div>
                  <h3 className="mt-5 text-[17px] font-bold leading-6 tracking-[-.02em] text-slate-900">{scenario.heroHeadline}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{scenario.intro}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400"><Clock3 size={13} />{scenario.estimatedFixTime}</span><span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 transition group-hover:gap-2">Get my steps<ArrowRight size={14} /></span></div>
                </SpotlightCard>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white" id="triage">
        <div className="container grid gap-10 py-14 sm:py-16 md:grid-cols-[.75fr_1.25fr] md:items-center">
          <div><div className="kicker"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Simple by design</div><h2 className="section-title mt-3 text-slate-950">A steady plan beats a scary popup.</h2><p className="mt-3 text-sm leading-6 text-slate-500">We help you separate what actually happened from what a scammer wants you to fear.</p><Link href="/privacy" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline">How privacy works<ArrowUpRight size={15} /></Link></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[{ n: '01', title: 'Tell us what happened', body: 'Four quick questions. Never type a password, card number, or security code.' }, { n: '02', title: 'Get your repair kit', body: 'A prioritized checklist shaped by your answers and device.' }, { n: '03', title: 'Check off each step', body: 'Progress stays in your browser; print the guide if you need it offline.' }].map((item) => <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4" key={item.n}><span className="text-xs font-extrabold tracking-[.14em] text-blue-600">{item.n}</span><h3 className="mt-3 text-sm font-bold text-slate-900">{item.title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{item.body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 p-7 text-white sm:p-10 lg:p-12">
            <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/10" /><div className="absolute -right-5 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center"><div><div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-blue-100"><ShieldCheck size={14} />Built for families</div><h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-.04em] sm:text-4xl">Help a parent spot the pressure before it works.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/85">Practice with realistic scam examples, learn safe responses, and print a simple device-lockdown plan together.</p></div><Link href="/scam-shield" className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 text-sm font-bold text-blue-800 transition hover:bg-blue-50 md:self-center">Explore Senior Scam Shield<ArrowRight size={16} /></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
