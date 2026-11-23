import type { ToolCategory } from './triageScenarios';

/** Replace each example URL with your approved affiliate destination before publishing. */
export const affiliateConfig: Record<ToolCategory, { label: string; url: string; categoryName: string }> = {
  'password-manager': {
    label: 'Password manager',
    url: 'https://example.com/replace-with-your-affiliate-link/password-manager',
    categoryName: 'Password managers',
  },
  'identity-protection': {
    label: 'Identity monitoring',
    url: 'https://example.com/replace-with-your-affiliate-link/identity-protection',
    categoryName: 'Identity-protection services',
  },
  antivirus: {
    label: 'Device security software',
    url: 'https://example.com/replace-with-your-affiliate-link/device-security',
    categoryName: 'Device security tools',
  },
  'data-removal': {
    label: 'Data-removal service',
    url: 'https://example.com/replace-with-your-affiliate-link/data-removal',
    categoryName: 'Data-removal services',
  },
  'hardware-key': {
    label: 'Hardware security key',
    url: 'https://example.com/replace-with-your-affiliate-link/hardware-key',
    categoryName: 'Hardware security keys',
  },
};
