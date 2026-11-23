export type ScamTab = 'bank-text' | 'tech-popup' | 'voice-clone';

export interface ScamScenario {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  initialTab: ScamTab;
  lesson: string;
  safeResponse: string;
}

export const scamScenarios: ScamScenario[] = [
  {
    slug: 'fake-bank-text',
    title: 'Fake bank text: spot the pressure and the link',
    seoTitle: 'Practice Spotting a Fake Bank Text',
    metaDescription: 'Try an interactive fake bank text simulation and learn how to verify an account alert safely.',
    summary: 'Scammers borrow a bank’s tone and use an urgent link to get a password, a card number, or a one-time code.',
    initialTab: 'bank-text',
    lesson: 'A familiar sender name is not proof. Message sender IDs and phone numbers can be impersonated, and a convincing-looking link can lead to a fake sign-in page.',
    safeResponse: 'Do not tap, reply, or call a number in the message. Open the bank’s official app yourself or call the number on the back of the card.',
  },
  {
    slug: 'tech-support-popup',
    title: 'Fake tech-support popup: close it safely',
    seoTitle: 'Practice Responding to a Fake Tech-Support Popup',
    metaDescription: 'Learn why a locked-screen security popup asking you to call support is a scam and how to close it safely.',
    summary: 'A loud warning and a phone number are designed to scare you into calling a scammer who may ask for remote access or money.',
    initialTab: 'tech-popup',
    lesson: 'Real security warnings do not ask you to call a phone number. A website cannot diagnose a virus just because its page says so.',
    safeResponse: 'Do not call or grant remote access. Close the tab or force-quit the browser; if you already called, contact your bank and a trusted technician using a number you find independently.',
  },
  {
    slug: 'ai-voice-cloning',
    title: 'AI voice cloning: slow down and verify another way',
    seoTitle: 'Practice Responding to an AI Voice-Cloning Scam',
    metaDescription: 'A safe interactive voice-cloning scenario to practice checking urgent family money requests out of band.',
    summary: 'A short clip from social media can be enough to make a synthetic voice sound familiar. Urgency and secrecy are the warning signs.',
    initialTab: 'voice-clone',
    lesson: 'Do not rely on caller ID or voice alone for a surprise request involving money, passwords, or a one-time code.',
    safeResponse: 'Hang up and call the person back using a number already saved in your contacts. Ask a question or use a family safe word you agreed on ahead of time.',
  },
];

export function getScamScenario(slug: string) {
  return scamScenarios.find((scenario) => scenario.slug === slug);
}
