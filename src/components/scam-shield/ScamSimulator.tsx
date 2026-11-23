'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ExternalLink, Headphones, MessageSquareWarning, Phone, Play, ShieldCheck, X, XCircle } from 'lucide-react';
import type { ScamTab } from '@/data/scamScenarios';

const tabs: { id: ScamTab; label: string }[] = [
  { id: 'bank-text', label: 'Fake bank text' },
  { id: 'tech-popup', label: 'Tech-support popup' },
  { id: 'voice-clone', label: 'AI voice call' },
];

const clueCopy: Record<string, { title: string; text: string }> = {
  sender: { title: 'Sender name can be spoofed', text: 'A familiar bank name or caller ID is not verification. Open your bank’s app or call the number printed on your card instead.' },
  url: { title: 'Look-alike domain', text: 'The example domain is not the bank’s official address. Avoid tapping it; type the bank’s known website yourself or use the official app.' },
  urgency: { title: 'Urgency is the hook', text: 'Scammers use a countdown or a frightening charge to make you act before thinking. A real alert can wait while you verify it independently.' },
  popup: { title: 'A webpage cannot diagnose your computer', text: 'The browser alert is only a page designed to look alarming. Real security warnings do not ask you to call a number.' },
  call: { title: 'Do not call the number shown', text: 'Calling can connect you to the scammer, who may ask for remote access, payment, or passwords. Close the tab instead.' },
  voice: { title: 'A familiar voice is not proof', text: 'Voice cloning can imitate tone and cadence. Caller ID can also be spoofed. Hang up and call the person back on a saved, trusted number.' },
  pressure: { title: 'Urgency and secrecy are red flags', text: 'An emergency story that demands money immediately and says “don’t tell anyone” is designed to isolate you. Slow down and verify with another family member.' },
  safe: { title: 'Use a family safe word as one signal', text: 'Agree on a private phrase in person, ahead of time. If a caller cannot confirm it, hang up and call back using a saved number. Never share the phrase in a text or social post.' },
};

const transcript = 'Hey, it’s me. I lost my phone and I’m at the airport. I need you to send eight hundred dollars right now. Please don’t call me, this number is about to die.';

export default function ScamSimulator({ initialTab = 'bank-text' }: { initialTab?: ScamTab }) {
  const [active, setActive] = useState<ScamTab>(initialTab);
  const [clue, setClue] = useState<string>('');
  const [popupSafe, setPopupSafe] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(true);

  useEffect(() => () => { if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel(); }, []);

  function playSample() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) { setVoiceAvailable(false); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.rate = 0.96;
    utterance.pitch = 1;
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  }

  function selectTab(tab: ScamTab) {
    if (playing && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setPlaying(false); setClue(''); setPopupSafe(false); setActive(tab);
  }

  const cluePanel = clue && clueCopy[clue] ? <motion.div key={clue} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4" role="status"><p className="text-sm font-bold text-blue-950">{clueCopy[clue].title}</p><p className="mt-1.5 text-sm leading-6 text-blue-900/80">{clueCopy[clue].text}</p></motion.div> : <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-500">Tap one of the highlighted details to see what it is trying to make you do.</div>;

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-100 bg-white px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Scam practice scenarios">
          {tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={active === tab.id} type="button" onClick={() => selectTab(tab.id)} className={`rounded-t-xl border-b-2 px-3 py-3 text-xs font-bold transition sm:px-4 sm:text-sm ${active === tab.id ? 'border-blue-600 bg-blue-50/70 text-blue-800' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>{tab.label}</button>)}
        </div>
      </div>
      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-8">
        <div>
          {active === 'bank-text' && <div className="mx-auto max-w-[330px] rounded-[30px] border-[7px] border-slate-800 bg-slate-800 p-1 shadow-xl">
            <div className="overflow-hidden rounded-[22px] bg-[#f2f2f7]">
              <div className="bg-white px-4 pb-3 pt-4 text-center"><div className="mx-auto mb-2 h-1 w-12 rounded-full bg-slate-300" /><p className="text-[11px] text-slate-400">Today 9:41 AM</p></div>
              <div className="min-h-[325px] px-3 py-4">
                <p className="mb-2 text-center text-[10px] font-semibold text-slate-400">Messages</p>
                <div className="mx-auto max-w-[255px] rounded-2xl rounded-tl-sm bg-white p-3.5 shadow-sm">
                  <button type="button" onClick={() => setClue('sender')} className="rounded-md bg-amber-100 px-1 text-left text-[11px] font-bold text-slate-800 underline decoration-amber-500 decoration-dotted underline-offset-2">Northstar Bank</button>
                  <p className="mt-2 text-[13px] leading-[1.55] text-slate-800">We blocked a <button type="button" onClick={() => setClue('urgency')} className="bg-amber-100 font-semibold underline decoration-amber-500 decoration-dotted underline-offset-2">$487.20 transfer</button>. If this wasn’t you, <button type="button" onClick={() => setClue('url')} className="rounded bg-red-50 px-1 font-semibold text-blue-700 underline decoration-red-400 decoration-dotted underline-offset-2">verify now: northstar-secure.support/hold</button>. Reply YES to stop the charge.</p>
                  <p className="mt-2 text-[9px] text-slate-400">Tap highlighted items to investigate</p>
                </div>
                <div className="mt-5 flex justify-center"><span className="rounded-full bg-white px-3 py-1 text-[10px] text-slate-400">SIMULATION — no real message</span></div>
              </div>
              <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"><span className="h-8 flex-1 rounded-full border border-slate-200" /><span className="text-xs font-bold text-slate-300">Send</span></div>
            </div>
          </div>}
          {active === 'tech-popup' && <div className="relative mx-auto max-w-[430px] overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /><span className="ml-2 h-5 flex-1 rounded bg-white px-2 text-[9px] leading-5 text-slate-400">news-and-safety.example</span><X size={13} className="text-slate-400" /></div>
            <div className="flex min-h-[330px] items-center justify-center bg-[linear-gradient(135deg,#eef2f7,#dce5f2)] p-5">
              {!popupSafe ? <div className="w-full max-w-[315px] rounded-xl border border-red-200 bg-white p-5 shadow-2xl">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600"><AlertTriangle size={22} /></span><div><p className="text-sm font-extrabold text-red-800">SECURITY WARNING</p><p className="text-[10px] font-semibold text-red-600">SIMULATED POPUP</p></div></div>
                <button type="button" onClick={() => setClue('popup')} className="mt-4 text-left text-sm font-bold leading-5 text-slate-900 underline decoration-amber-500 decoration-dotted underline-offset-2">Your device may be infected. Do not close this window.</button>
                <p className="mt-2 text-xs leading-5 text-slate-600">Call <button type="button" onClick={() => setClue('call')} className="font-extrabold text-red-700 underline decoration-dotted underline-offset-2">1-800-555-0199</button> immediately for help. Your files may be at risk.</p>
                <button type="button" onClick={() => setClue('call')} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-xs font-bold text-white"><Phone size={14} />Call support (simulation only)</button>
                <p className="mt-2 text-center text-[9px] font-semibold text-slate-400">Not an actual alert. Do not call.</p>
              </div> : <div className="max-w-[300px] text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><CheckCircle2 size={28} /></span><p className="mt-3 font-bold text-slate-900">You left the fake alert</p><p className="mt-2 text-sm leading-6 text-slate-600">If this were on a computer, close the tab or quit the browser. You do not need to call the number.</p></div>}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-slate-200 bg-white p-3"><span className="text-[10px] font-semibold text-slate-500">What would you do?</span><button type="button" onClick={() => setPopupSafe(true)} className="rounded-lg bg-emerald-600 px-3 py-2 text-[10px] font-bold text-white hover:bg-emerald-700">Close it safely</button></div>
          </div>}
          {active === 'voice-clone' && <div className="mx-auto max-w-[430px] rounded-2xl border border-slate-200 bg-gradient-to-b from-indigo-50 to-white p-5 sm:p-6">
            <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-700"><Headphones size={20} /></div><div><p className="text-sm font-bold text-slate-900">A family emergency call</p><p className="text-[11px] text-slate-500">Computer-generated demo voice · not an imitation</p></div></div>
            <div className={`wave-active mt-7 flex h-16 items-center justify-center gap-[3px] rounded-xl bg-white px-4 ${playing ? 'wave-active' : ''}`} aria-label="Illustrative synthetic voice waveform">{Array.from({ length: 45 }, (_, i) => <span key={i} className="wave-bar w-[3px] rounded-full bg-indigo-400" style={{ height: `${10 + ((i * 17 + 13) % 34)}px`, animationDelay: `${(i % 9) * .07}s` }} />)}</div>
            <button type="button" onClick={playing ? () => { window.speechSynthesis.cancel(); setPlaying(false); } : playSample} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 py-3 text-sm font-bold text-white transition hover:bg-indigo-800">{playing ? <><X size={16} />Stop sample</> : <><Play size={16} fill="currentColor" />Play synthetic sample</>}</button>
            {!voiceAvailable && <p className="mt-2 text-xs text-slate-500">Speech playback is not available in this browser. The transcript below is still usable.</p>}
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[.11em] text-slate-400">Sample transcript · tap the clues</p>
            <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3 text-sm leading-7 text-slate-700">
              <button type="button" onClick={() => setClue('voice')} className="rounded bg-amber-100 px-1 text-left underline decoration-amber-500 decoration-dotted underline-offset-2">“Hey, it’s me. I lost my phone and I’m at the airport.”</button>{' '}
              <button type="button" onClick={() => setClue('pressure')} className="rounded bg-red-50 px-1 text-left underline decoration-red-400 decoration-dotted underline-offset-2">“I need you to send $800 right now. Please don’t call me, this number is about to die.”</button>
              <div className="mt-3 flex gap-2 rounded-lg bg-indigo-50 p-2.5 text-[11px] leading-5 text-indigo-900"><ShieldCheck size={15} className="mt-0.5 shrink-0" />Agree on a private family safe word in person—never in a group text or public profile.</div>
            </div>
          </div>}
        </div>
        <div className="flex flex-col">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-800"><MessageSquareWarning size={13} />Practice scenario · no real messages</div>
          <h3 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">{active === 'bank-text' ? 'Would you tap this bank alert?' : active === 'tech-popup' ? 'A warning is trying to take control' : 'Could this voice rush you into sending money?'}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{active === 'bank-text' ? 'Tap the sender, urgent claim, or link to inspect the clues. The mock phone is fully simulated.' : active === 'tech-popup' ? 'Fake support popups often use alarm and a phone number. Try the safe-close action; no number is dialed.' : 'This voice is generated by your browser to read a fictional script. It does not imitate a real person. Tap the highlighted phrases to see the pressure tactics.'}</p>
          {cluePanel}
          {active === 'tech-popup' && <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4"><h4 className="text-sm font-bold text-emerald-950">If a popup seems stuck</h4><ul className="mt-2 grid gap-1.5 text-xs leading-5 text-emerald-900/85"><li><strong>Windows:</strong> close the tab; if the browser is unresponsive, Ctrl+Shift+Esc → select the browser → End task.</li><li><strong>Mac:</strong> press Command-Q; if needed, Command-Option-Esc → select the browser → Force Quit.</li><li><strong>Phone:</strong> open the app switcher and swipe the browser away, then reopen it without restoring the suspicious page.</li></ul><p className="mt-2 text-[10px] leading-4 text-emerald-800">Controls vary by device. If you already gave remote access, disconnect and contact a trusted technician through an official channel.</p></div>}
          {active === 'voice-clone' && <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4"><h4 className="text-sm font-bold text-indigo-950">A simple family protocol</h4><ol className="mt-2 grid gap-1.5 text-xs leading-5 text-indigo-950/80"><li>1. Pause. Do not send money or share codes on the call.</li><li>2. Hang up and call the person back at a number you already saved.</li><li>3. Ask a private family question or safe word you agreed on before any emergency.</li></ol></div>}
          {active === 'bank-text' && <a href="https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams" target="_blank" rel="noreferrer" className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline">FTC guide to phishing texts <ExternalLink size={12} /></a>}
          {active === 'tech-popup' && <a href="https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams" target="_blank" rel="noreferrer" className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline">FTC guide to tech-support scams <ExternalLink size={12} /></a>}
          {active === 'voice-clone' && <div className="mt-4 flex gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-500"><XCircle size={15} className="mt-0.5 shrink-0 text-rose-500" />Do not rely on voice recognition or caller ID alone for an unexpected request involving money or security codes.</div>}
        </div>
      </div>
    </div>
  );
}
