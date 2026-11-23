# Breach Repair Kit

A calm, mobile-first digital emergency room and family scam-prevention hub built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## What's included

- Homepage with six symptom cards that link to statically generated, search-ready incident guides.
- Four-question incident triage flows for suspicious links, unfamiliar login alerts, fake delivery texts, unusual phone behavior, bank fraud texts, and compromised email.
- Personalized recovery checklists with expandable device-specific directions, local progress, an illustrative action tracker, optional tool cards, and print CSS.
- Family Scam Shield with fictional interactive bank-text and tech-support popup simulations, a browser-generated synthetic speech demo, and a printable household lockdown blueprint.
- Programmatic pages for three scam-prevention scenarios, plus privacy and affiliate-disclosure pages.
- No account, analytics, advertising pixel, or quiz-answer API in this starter. Answers and checklist progress are stored in localStorage; the family safe-word field is not persisted.

## Local development

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Visit <http://localhost:3000>.

Run a strict TypeScript check and production build:

```bash
npm run typecheck
npm run build
```

## Where to add affiliate links

Edit `src/data/affiliateConfig.ts` and replace the `https://example.com/replace-with-your-affiliate-link/...` values with approved destinations. Update product names, descriptions, CTA copy, and eligibility in `src/data/triageScenarios.ts` as needed. Review every statement for accuracy and ensure that any required partner terms are followed. Placeholder URLs are not live endorsements or offers.

Affiliate disclosure text lives at `src/app/disclosure/page.tsx`; the privacy summary lives at `src/app/privacy/page.tsx`. Review both against your actual deployment and any services added.

## Add a new incident landing page

Add a typed `TriageScenario` object in `src/data/triageScenarios.ts` with a unique `slug`, metadata, four questions, and recovery steps. Set `showIf` rules to match the question IDs and option values. The route at `src/app/triage/[slug]/page.tsx` generates static params and metadata from that data automatically.

Add scam-prevention landing pages in `src/data/scamScenarios.ts`. Use one of the supported simulator tabs (`bank-text`, `tech-popup`, or `voice-clone`) and the dynamic route will generate the page.

## Deploy to Vercel

1. Create a Git repository and push this project to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js settings.
3. Use the default build command (`npm run build`) and output settings. No environment variables are required for this starter.
4. Deploy a preview, test all six `/triage/[slug]` routes, the three `/scam-shield/[slug]` routes, printing, mobile layouts, and the Privacy/Disclosure pages.
5. Replace example affiliate URLs and review all copy, sources, hosting/privacy language, and partner disclosures before production launch.

## Accuracy and safety notes

This is educational guidance, not a forensic diagnosis. Security scores are visual checklist progress—not a validated risk measurement. For an active unauthorized bank transaction, contact the bank through the number on a card or statement. Official guidance links are included in the relevant flows and footer. Recheck platform menus and external references before publishing because vendors may change their interfaces.
