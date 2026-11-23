import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function NotFound() {
  return <div className="container flex min-h-[52vh] flex-col items-center justify-center py-20 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><ShieldCheck size={28} /></div><p className="mt-6 text-xs font-extrabold uppercase tracking-[.14em] text-blue-700">404 · Guide not found</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Let’s get you to the right place.</h1><p className="mt-3 max-w-md text-sm leading-6 text-slate-500">That guide may have moved. Choose another incident from the homepage.</p><Link href="/" className="btn-primary mt-6"><ArrowLeft size={15} />Back to the homepage</Link></div>;
}
