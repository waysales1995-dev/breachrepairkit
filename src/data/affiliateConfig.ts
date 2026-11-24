import type { ToolCategory } from './triageScenarios';

export const AMAZON_TAG = 'breachresponsekit-20';

export function amazonSearchUrl(query: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
}

export const affiliateConfig: Record<
  ToolCategory | 'senior-call-blocker' | 'senior-phone' | 'usb-data-blocker' | 'rfid-wallet',
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
    label: 'YubiKey 5 NFC / 5C NFC Security Key',
    url: amazonSearchUrl('YubiKey 5 NFC security key'),
    categoryName: 'Hardware security keys',
  },
  'senior-call-blocker': {
    label: 'CPR Call Blocker V5000',
    url: amazonSearchUrl('CPR Call Blocker V5000 landline'),
    categoryName: 'Senior call-blocking hardware',
  },
  'senior-phone': {
    label: 'Simplified Senior Cell Phone with SOS & Scam Block',
    url: amazonSearchUrl('Lively Jitterbug Smart4 senior cell phone'),
    categoryName: 'Senior-friendly phones',
  },
  'usb-data-blocker': {
    label: 'PortaPow USB-C / USB-A Data Blocker',
    url: amazonSearchUrl('PortaPow USB C data blocker'),
    categoryName: 'USB charging data blockers',
  },
  'rfid-wallet': {
    label: 'RFID-Blocking Card Sleeve & Wallet Protector',
    url: amazonSearchUrl('RFID blocking card holder wallet sleeve'),
    categoryName: 'Physical card protection',
  },
};
