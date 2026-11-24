'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronDown, Clock3, ExternalLink, LockKeyhole, Printer, RotateCcw, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
import type { DevicePlatform, RecoveryStep, TriageScenario } from '@/data/triageScenarios';
import { affiliateConfig } from '@/data/affiliateConfig';

const platformOptions: { value: DevicePlatform; label: string }[] = [
  { value: 'iphone', label: 'iPhone / iPad' },
  { value: 'android', label: 'Android' },
  { value: 'windows', label: 'Windows PC' },
  { value: 'mac', label: 'Mac' },
  { value: 'other', label: 'Other device' },
];

const platformFallback: Record<DevicePlatform, string> = {
  iphone: 'On iPhone or iPad: open the service’s official app, or type its known address in Safari. Avoid the link in the suspicious message.',
  android: 'On Android: open the service’s official app, or type its known address in your browser. Avoid the link in the suspicious message.',
  windows: 'On Windows PC: use a trusted browser and type the service’s known address yourself. Avoid the link in the suspicious message.',
  mac: 'On Mac: open the service’s official app, or type its known address in a trusted browser. Avoid the link in the suspicious message.',
  other: 'On your device: use the service’s official app or type its known address yourself. Avoid the link in the suspicious message.',
};

type SavedState = { answers?: Record<string, string>; checked?: string[]; view?: 'quiz' | 'kit'; questionIndex?: number };

function saveLocal(scenario: string, state: SavedState) {
  try { window.localStorage.setItem(`brk:triage:${scenario}`, JSON.stringify(state)); } catch { /* storage may be unavailable; the session still works */ }
}

function matches(step: RecoveryStep, answers: Record<string, string>) {
  if (!step.showIf) return true;
  return step.showIf.anyOf.includes(answers[step.showIf.questionId] ?? '') || (step.showIf.or ?? []).some((rule) => rule.anyOf.includes(answers[rule.questionId] ?? ''));
}

function StepCard({ step, done, onToggle, defaultPlatform }: { step: RecoveryStep; done: boolean; onToggle: () => void; defaultPlatform?: string }) {
  const [open, setOpen] = useState(false);
  const initialPlatform = platformOptions.some((p) => p.value === defaultPlatform) ? defaultPlatform as DevicePlatform : 'iphone';
  const [platform, setPlatform] = useState<DevicePlatform>(initialPlatform);
  const platformText = step.platformInstructions?.[platform] ?? `${platformFallback[platform]}\n\n${step.exactInstructions}`;
  return (
    <article className={`rounded-2xl border p-4 transition sm:p-5 ${done ? 'border-emerald-200 bg-emerald-50/55' : 'border-slate-200 bg-white hover:border-blue-200'}`}>
      <div className="flex items-start gap-3.5">
        <button type="button" onClick={onToggle} aria-label={`${done ? 'Mark incomplete' : 'Mark complete'}: ${step.stepTitle}`} aria-pressed={done} className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition ${done ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent hover:border-blue-500'}`}><Check size={15} strokeWidth={3} /></button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`text-[15px] font-bold leading-6 ${done ? 'text-emerald-950 line-through decoration-emerald-500/60' : 'text-slate-900'}`}>{step.stepTitle}</h3>
            {done && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">Done</span>}
          </div>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">{step.whyItMatters}</p>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800">
            {open ? 'Hide exact steps' : 'Show me exact steps'}<ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 sm:p-4">
                <>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[.1em] text-slate-500">Choose your device</p>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {platformOptions.map((item) => <button key={item.value} type="button" onClick={() => setPlatform(item.value)} className={`rounded-full border px-2.5 py-1.5 text-[11px] font-semibold ${platform === item.value ? 'border-blue-600 bg-blue-600 text-white' : 'border-blue-200 bg-white text-slate-700 hover:border-blue-400'}`}>{item.label}</button>)}
                  </div>
                </>
                <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{platformText}</p>
                {step.externalUrl && <a href={step.externalUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline">{step.externalLabel ?? 'Read the official guidance'}<ExternalLink size={12} /></a>}
              </div>
            </motion.div>}
          </AnimatePresence>
          {step.recommendedTool && (() => {
            const tool = step.recommendedTool;
            const configured = affiliateConfig[tool.category];
            return <div className="mt-4 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-3.5 sm:p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><LockKeyhole size={18} /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-extrabold uppercase tracking-[.1em] text-blue-700">Optional tool</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{tool.badgeText}</span></div>
                  <p className="mt-1 text-sm font-bold text-slate-900">{tool.toolName}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{tool.description}</p>
                  <a href={configured.url || tool.affiliatePlaceholderUrl} target="_blank" rel="sponsored noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">{tool.ctaText}<ExternalLink size={12} /></a>
                  <p className="mt-1 text-[10px] leading-4 text-slate-400">Example affiliate destination—replace before launch. See our <a className="underline" href="/disclosure">disclosure</a>.</p>
                </div>
              </div>
            </div>;
          })()}
        </div>
      </div>
    </article>
  );
}

export default function TriageWizard({ scenario }: { scenario: TriageScenario }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<string[]>([]);
  const [view, setView] = useState<'quiz' | 'kit'>('quiz');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- restore this guide's saved browser-local progress on mount */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`brk:triage:${scenario.slug}`);
      if (raw) {
        const saved = JSON.parse(raw) as SavedState;
        const safeAnswers = Object.fromEntries(Object.entries(saved.answers ?? {}).filter(([key, value]) => scenario.questions.some((q) => q.id === key && q.choices.some((choice) => choice.value === value))));
        setAnswers(safeAnswers);
        setChecked((saved.checked ?? []).filter((id) => scenario.checklistSteps.some((step) => step.id === id)));
        setQuestionIndex(Math.min(saved.questionIndex ?? 0, scenario.questions.length - 1));
        setView(saved.view === 'kit' && scenario.questions.every((q) => safeAnswers[q.id]) ? 'kit' : 'quiz');
      }
    } catch { /* malformed local state is ignored */ }
    setLoaded(true);
  }, [scenario]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const steps = useMemo(() => scenario.checklistSteps.filter((step) => matches(step, answers)).sort((a, b) => (b.severityWeight + (b.showIf ? 8 : 0)) - (a.severityWeight + (a.showIf ? 8 : 0))), [scenario, answers]);
  const risk = useMemo(() => {
    const answerRisk = scenario.questions.reduce((sum, question) => {
      const answer = answers[question.id];
      return sum + (question.choices.find((choice) => choice.value === answer)?.riskDelta ?? 0);
    }, 0);
    const completedWeight = steps.filter((step) => checked.includes(step.id)).reduce((sum, step) => sum + step.severityWeight, 0);
    return Math.max(0, Math.min(96, scenario.riskBase + answerRisk) - completedWeight);
  }, [answers, checked, scenario, steps]);
  const currentQuestion = scenario.questions[questionIndex];
  const progress = view === 'kit' ? 100 : Math.round((questionIndex / scenario.questions.length) * 100);
  const riskLabel = risk === 0 ? 'Secured steps complete' : risk >= 70 ? 'High exposure' : risk >= 43 ? 'Elevated attention' : risk >= 20 ? 'Stay watchful' : 'Lower exposure';
  const riskColor = risk === 0 ? 'text-emerald-700' : risk >= 70 ? 'text-red-700' : risk >= 43 ? 'text-amber-700' : 'text-blue-700';
  const barColor = risk === 0 ? 'bg-emerald-500' : risk >= 70 ? 'bg-red-500' : risk >= 43 ? 'bg-amber-500' : 'bg-blue-500';

  function persist(next: { answers?: Record<string, string>; checked?: string[]; view?: 'quiz' | 'kit'; questionIndex?: number }) {
    saveLocal(scenario.slug, { answers, checked, view, questionIndex, ...next });
  }
  function choose(value: string) {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);
    persist({ answers: nextAnswers });
  }
  function goNext() {
    if (!answers[currentQuestion.id]) return;
    if (questionIndex === scenario.questions.length - 1) {
      setView('kit');
      persist({ view: 'kit' });
    } else {
      const next = questionIndex + 1;
      setQuestionIndex(next);
      persist({ questionIndex: next });
    }
  }
  function goBack() {
    if (view === 'kit') { setView('quiz'); setQuestionIndex(scenario.questions.length - 1); persist({ view: 'quiz', questionIndex: scenario.questions.length - 1 }); return; }
    if (questionIndex > 0) { const next = questionIndex - 1; setQuestionIndex(next); persist({ questionIndex: next }); }
  }
  function toggleStep(id: string) {
    const next = checked.includes(id) ? checked.filter((item) => item !== id) : [...checked, id];
    setChecked(next);
    persist({ checked: next });
  }
  function reset() {
    setAnswers({}); setChecked([]); setQuestionIndex(0); setView('quiz');
    try { window.localStorage.removeItem(`brk:triage:${scenario.slug}`); } catch { /* ignore */ }
  }

  if (!loaded) return <div className="container py-14"><div className="card h-72 animate-pulse bg-slate-100" /></div>;

  return (
    <div className="container pb-16 pt-9 sm:pt-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/#scenarios" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft size={16} />All incident guides</Link>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800"><LockKeyhole size={13} />Private on this device</span>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center gap-2"><span className="rounded-full bg-amber-100 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-800">{scenario.urgencyBadge}</span><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Clock3 size={14} />{scenario.estimatedFixTime} to review</span></div>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-[-.045em] text-slate-900 sm:text-4xl">{view === 'kit' ? 'Your custom breach repair kit' : scenario.heroHeadline}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{view === 'kit' ? 'Work through what applies to you. Check off each step as you complete it; your progress is saved only in this browser.' : scenario.intro}</p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label="Triage progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><motion.div className="h-full rounded-full bg-blue-600" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: .35 }} /></div>
          <div className="mt-2 flex justify-between text-[11px] font-semibold text-slate-400"><span>{view === 'kit' ? 'Repair kit' : `Question ${questionIndex + 1} of ${scenario.questions.length}`}</span><span>{progress}% complete</span></div>
          <AnimatePresence mode="wait" initial={false}>
            {view === 'quiz' ? <motion.div key={`q-${questionIndex}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }} className="card mt-6 p-5 sm:p-7">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Sparkles size={18} /></div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{currentQuestion.prompt}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{currentQuestion.helper}</p>
              <div className="mt-5 grid gap-2.5">
                {currentQuestion.choices.map((choice) => {
                  const active = answers[currentQuestion.id] === choice.value;
                  return <button key={choice.value} type="button" aria-pressed={active} onClick={() => choose(choice.value)} className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${active ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'}`}>
                    <span><span className="block text-sm font-bold text-slate-800">{choice.label}</span>{choice.helper && <span className="mt-1 block text-xs text-slate-500">{choice.helper}</span>}</span>
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white text-transparent'}`}><Check size={12} strokeWidth={3} /></span>
                  </button>;
                })}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <button type="button" onClick={goBack} disabled={questionIndex === 0} className="btn-secondary min-h-11 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={15} />Back</button>
                <button type="button" onClick={goNext} disabled={!answers[currentQuestion.id]} className="btn-primary min-h-11 text-sm disabled:cursor-not-allowed disabled:opacity-45">{questionIndex === scenario.questions.length - 1 ? 'Build my repair kit' : 'Continue'}<ArrowRight size={15} /></button>
              </div>
            </motion.div> : <motion.div key="kit" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .22 }} className="mt-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 no-print">
                <button type="button" onClick={goBack} className="btn-secondary min-h-10 px-3 text-xs"><ArrowLeft size={14} />Review answers</button>
                <div className="flex gap-2"><button type="button" onClick={() => window.print()} className="btn-secondary min-h-10 px-3 text-xs"><Printer size={14} />Print / save</button><button type="button" onClick={reset} className="btn-secondary min-h-10 px-3 text-xs"><RotateCcw size={14} />Start over</button></div>
              </div>
              <div className="mb-4 rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-sm leading-6 text-amber-950"><strong>Take a breath.</strong> The score is a progress indicator—not a diagnosis or a measure of actual compromise. If money is actively leaving an account, contact your bank using the number on your card or statement now.</div>
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-900"><ShieldCheck size={18} className="shrink-0" /><span><strong>Saved only in this browser.</strong> No quiz answers or checklist progress are sent to Breach Response Kit.</span></div>
              <div className="grid gap-3">
                {steps.map((step) => <StepCard key={step.id} step={step} done={checked.includes(step.id)} onToggle={() => toggleStep(step.id)} defaultPlatform={answers.device} />)}
              </div>
              {steps.every((step) => checked.includes(step.id)) && <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center"><CheckCircle2 size={27} className="mx-auto text-emerald-600" /><h3 className="mt-2 font-bold text-emerald-950">You’ve worked through this repair kit</h3><p className="mt-1 text-sm text-emerald-800">Keep an eye on your accounts and use official support if anything changes.</p></div>}
              <p className="mt-5 text-xs leading-5 text-slate-500">This guide is educational and cannot confirm whether an account or device was compromised. For identity theft, use <a className="font-semibold text-blue-700 underline" href="https://www.identitytheft.gov/" target="_blank" rel="noreferrer">IdentityTheft.gov</a>.</p>
            </motion.div>}
          </AnimatePresence>
        </section>
        <aside className="lg:sticky lg:top-24">
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-[.1em] text-slate-500">Live action tracker</span><ShieldAlert className={risk === 0 ? 'text-emerald-600' : risk >= 70 ? 'text-red-600' : risk >= 43 ? 'text-amber-600' : 'text-blue-600'} size={19} /></div>
            <div className="mt-5 flex items-end justify-between gap-3"><div><motion.div key={risk} initial={{ opacity: .6, y: 4 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl font-extrabold tracking-[-.06em] ${riskColor}`}>{risk}<span className="ml-1 text-base font-bold">/100</span></motion.div><p className={`mt-1 text-xs font-bold ${riskColor}`}>{riskLabel}</p></div><div className="mb-1 text-right text-[11px] leading-5 text-slate-400">{checked.length} of {steps.length}<br />actions checked</div></div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100"><motion.div className={`h-full rounded-full ${barColor}`} initial={false} animate={{ width: `${risk}%` }} transition={{ duration: .55, ease: 'easeOut' }} /></div>
            <div className="mt-5 rounded-xl bg-slate-50 p-3.5"><p className="flex items-center gap-2 text-xs font-bold text-slate-800"><ShieldCheck size={15} className="text-emerald-600" />One clear step at a time</p><p className="mt-1.5 text-xs leading-5 text-slate-500">Your score moves as you check off actions. It is a visual checklist—not a security assessment.</p></div>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-slate-500"><LockKeyhole size={13} className="text-emerald-600" />No account. No upload. Local browser storage.</div>
            <button type="button" onClick={() => window.print()} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"><Printer size={15} />Print this emergency kit</button>
          </div>
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4"><p className="text-xs font-bold text-blue-950">Need immediate account help?</p><p className="mt-1 text-xs leading-5 text-blue-900/75">Use the official app or a number on your card or statement—never a number in a suspicious message.</p></div>
        </aside>
      </div>
    </div>
  );
}
