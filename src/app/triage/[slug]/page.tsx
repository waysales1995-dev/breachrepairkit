import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TriageWizard from '@/components/triage/TriageWizard';
import { getTriageScenario, triageScenarios } from '@/data/triageScenarios';

export const dynamicParams = false;

export function generateStaticParams() {
  return triageScenarios.map((scenario) => ({ slug: scenario.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scenario = getTriageScenario(slug);
  if (!scenario) return { title: 'Incident guide not found' };
  return {
    title: scenario.seoTitle,
    description: scenario.metaDescription,
    alternates: { canonical: `/triage/${scenario.slug}` },
    openGraph: { title: scenario.seoTitle, description: scenario.metaDescription, type: 'article' },
  };
}

export default async function TriageScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = getTriageScenario(slug);
  if (!scenario) notFound();
  return <TriageWizard scenario={scenario} />;
}
