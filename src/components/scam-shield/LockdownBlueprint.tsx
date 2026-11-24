'use client';

import { useEffect, useState } from 'react';
import { Check, Circle, ExternalLink, PhoneOff, Printer, ShieldCheck, Smartphone } from 'lucide-react';
import { affiliateConfig } from '@/data/affiliateConfig';

const items = [
  { id: 'callers', title: 'Review unknown-caller settings together', detail: 'On iPhone, go to Settings → Apps → Phone → Screen Unknown Callers. Choose Ask Reason for Calling or Silence if it suits the household. Keep important contacts saved.' },
  { id: 'browser', title: 'Turn on browser pop-up protection', detail: 'Use the browser’s own settings to block pop-ups and remove notification permission for sites you do not recognize. A website warning should never make you call a number.' },
  { id: 'alerts', title: 'Turn on bank transaction alerts', detail: 'In the bank’s official app or by calling the number on the card, ask how to enable purchase and transfer alerts. Do not follow links in unsolicited texts.' },
  { id: 'updates', title: 'Set phones and computers to update automatically', detail: 'Install updates only from device Settings or the official app store. Do not install a profile or support app because an unexpected caller asks you to.' },
  { id: 'callback', title: 'Agree on a call-back rule for money requests', detail: 'For a surprise emergency request, pause and call the person back at a number already saved in contacts. Caller ID and a familiar voice can be spoofed.' },
  { id: 'recovery', title: 'Write down where to find official account recovery', detail: 'Bookmark or write down the bank’s official support number and email provider recovery page before anyone needs them. Keep the list somewhere safe and private.' },
];

export default function LockdownBlueprint() {
  const [checked, setChecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [safeWord, setSafeWord] = useState('');
  const callBlocker = affiliateConfig['senior-call-blocker'];
  const seniorPhone = affiliateConfig['senior-phone'];

  /* eslint-disable react-hooks/set-state-in-effect -- restore the family checklist from this browser on mount */
  useEffect(() => {
    try { const raw = window.localStorage.getItem('brk:family-lockdown'); if (raw) setChecked((JSON.parse(raw) as string[]).filter((id) => items.some((item) => item.id === id))); } catch { /* ignore malformed data */ }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function toggle(id: string) {
    const next = checked.includes(id) ? checked.filter((item) => item !== id) : [...checked, id];
    setChecked(next);
    try { window.localStorage.setItem('brk:family-lockdown', JSON.stringify(next)); } catch { /* checklist still works for this visit */ }
  }

  return (
    <section className="card p-5 sm:p-7" id="lockdown-blueprint">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><div className="kicker"><ShieldCheck size={14} />Print-ready family plan</div><h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">The family device-lockdown blueprint</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Sit together and check off what you have set up. Progress is stored only in this browser; your safe word is not saved.</p></div>
        <button type="button" onClick={() => window.print()} className="btn-secondary no-print min-h-10 px-3 text-xs"><Printer size={14} />Print blueprint</button>
      </div>
      <div className="mt-6 grid gap-3">
        {items.map((item) => {
          const done = checked.includes(item.id);
          return <button type="button" key={item.id} onClick={() => toggle(item.id)} aria-pressed={done} className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${done ? 'border-emerald-200 bg-emerald-50/70' : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'}`}>
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${done ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent'}`}>{done ? <Check size={13} strokeWidth={3} /> : <Circle size={13} />}</span><span><span className="block text-sm font-bold text-slate-900">{item.title}</span><span className="mt-1 block text-xs leading-5 text-slate-600">{item.detail}</span></span>
          </button>;
        })}
      </div>

      <div className="no-print mt-6">
        <p className="text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-400">
          Optional physical safeguards for parents &amp; seniors
        </p>
        <div className="mt-2.5 grid gap-3.5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <PhoneOff size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  Home landlines
                </span>
                <p className="mt-1.5 text-sm font-bold text-slate-900">One-Touch Scam Call Blocker</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Connects to a home landline to screen out known robocallers before the phone rings and adds a physical red “Block Now” button beside the handset.
                </p>
                <a
                  href={callBlocker.url}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline"
                >
                  View call blockers on Amazon <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <Smartphone size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                  Simplified mobile
                </span>
                <p className="mt-1.5 text-sm font-bold text-slate-900">Senior-Friendly Smartphone with Urgent Response</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Large-text interface designed for older adults with simplified menus, scam-call filtering, and a dedicated urgent-response button for family peace of mind.
                </p>
                <a
                  href={seniorPhone.url}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline"
                >
                  Compare senior phones on Amazon <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-slate-400">
          As an Amazon Associate I earn from qualifying purchases. See our <a href="/disclosure" className="underline">affiliate disclosure</a>.
        </p>
      </div>

      <div className="mt-6 grid gap-5 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 sm:grid-cols-[1fr_.9fr] sm:p-5">
        <div><h3 className="text-sm font-bold text-indigo-950">Make a family safe word</h3><p className="mt-1.5 text-xs leading-5 text-indigo-900/75">Agree on a private phrase together, in person. This box is not saved or sent anywhere. Only include it in a printout if you can keep the paper private and secure.</p><label htmlFor="safe-word" className="mt-3 block text-xs font-bold text-slate-700">Family safe word or question</label><input id="safe-word" value={safeWord} onChange={(event) => setSafeWord(event.target.value)} placeholder="Type a phrase to print (not stored)" autoComplete="off" className="mt-1.5 w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
        <div className="rounded-xl border border-indigo-200 bg-white p-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-indigo-500">Printable family card</p><p className="mt-2 text-sm font-bold text-slate-900">If a call feels urgent:</p><ol className="mt-2 grid gap-1 text-xs leading-5 text-slate-600"><li>1. Pause. Never share a sign-in code.</li><li>2. Hang up and call a saved number.</li><li>3. Ask our family safe word.</li></ol><div className="mt-3 border-t border-dashed border-slate-200 pt-2"><span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Our phrase</span><p className="mt-1 min-h-6 break-words font-mono text-sm font-bold text-indigo-800">{safeWord || '________________________________'}</p></div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400"><span>{ready ? `${checked.length} of ${items.length} items prepared` : 'Loading local checklist…'}</span><span className="font-semibold text-emerald-700">Private on this device</span></div>
      <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-3.5 text-xs leading-5 text-amber-950"><strong>Keep the phrase private.</strong> Avoid putting a safe word on a fridge where visitors can see it; store the printed card where trusted family can access it but strangers cannot.</div>
    </section>
  );
}
