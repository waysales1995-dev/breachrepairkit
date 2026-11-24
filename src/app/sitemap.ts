import type { MetadataRoute } from 'next';
import { triageScenarios } from '@/data/triageScenarios';
import { scamScenarios } from '@/data/scamScenarios';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://breachresponsekit.com';
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/scam-shield`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/disclosure`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const triageRoutes: MetadataRoute.Sitemap = triageScenarios.map((scenario) => ({
    url: `${baseUrl}/triage/${scenario.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const scamRoutes: MetadataRoute.Sitemap = scamScenarios.map((scenario) => ({
    url: `${baseUrl}/scam-shield/${scenario.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...triageRoutes, ...scamRoutes];
}
