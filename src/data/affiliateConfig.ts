import type { ToolCategory } from './triageScenarios';

/** Replace each URL with your approved affiliate tracking link as soon as each partner approves you. */
export const affiliateConfig: Record<
  ToolCategory | 'senior-call-blocker',
  { label: string; url: string; categoryName: string }
> = {
  'password-manager': {
    label: 'NordPass Password Manager',
    url: 'https://nordpass.com/',
    categoryName: 'Password managers',
  },
  'identity-protection': {
    label: 'Aura Identity Protection',
    url: 'https://www.aura.com/',
    categoryName: 'Identity-protection services',
  },
  antivirus: {
    label: 'Malwarebytes Device Security',
    url: 'https://www.malwarebytes.com/',
    categoryName: 'Device security tools',
  },
  'data-removal': {
    label: 'Incogni Data Removal',
    url: 'https://incogni.com/',
    categoryName: 'Data-removal services',
  },
  'hardware-key': {
    label: 'YubiKey 5 NFC Hardware Key',
    url: 'https://www.yubico.com/',
    categoryName: 'Hardware security keys',
  },
  'senior-call-blocker': {
    label: 'CPR Call Blocker V5000 (Amazon)',
    url: 'https://www.amazon.com/s?k=CPR+Call+Blocker+V5000',
    categoryName: 'Senior call-blocking hardware',
  },
};
