'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function BrandMark() {
  return (
    <svg aria-hidden="true" width="34" height="36" viewBox="0 0 40 44" fill="none">
      <path d="M20 2.8 35.7 8.2v12.9c0 10.1-6.8 17.1-15.7 20.1C11.1 38.2 4.3 31.2 4.3 21.1V8.2L20 2.8Z" fill="#2563EB" />
      <path d="M20 12v16M12 20h16" stroke="white" strokeWidth="3.6" strokeLinecap="round" />
    </svg>
  );
}

const links = [
  { href: '/#triage', label: 'Start triage' },
  { href: '/#scenarios', label: 'Scam scenarios' },
  { href: '/scam-shield', label: 'Senior scam shield' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container flex h-[74px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Breach Repair Kit home" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="text-[15px] font-extrabold tracking-[-.045em] text-slate-900 sm:text-base">Breach<span className="text-blue-600">Repair</span>Kit</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-[13px] font-semibold text-slate-600 transition hover:text-blue-700">{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-800"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />100% free · private · no account</span>
          <Link href="/#triage" className="rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:bg-blue-700">Get help now</Link>
        </div>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && <nav className="border-t border-slate-100 bg-white px-5 pb-5 pt-3 md:hidden" aria-label="Mobile navigation">
        <div className="container flex flex-col gap-1">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{link.label}</Link>)}
          <div className="mt-2 flex items-center gap-2 px-3 text-[11px] font-bold text-emerald-800"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />100% free · private · no account</div>
        </div>
      </nav>}
    </header>
  );
}
