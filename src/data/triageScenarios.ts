export type DevicePlatform = 'iphone' | 'android' | 'windows' | 'mac' | 'other';
export type ToolCategory = 'password-manager' | 'identity-protection' | 'antivirus' | 'data-removal' | 'hardware-key';

export interface Choice {
  value: string;
  label: string;
  helper?: string;
  riskDelta: number;
}

export interface DiagnosticQuestion {
  id: string;
  prompt: string;
  helper: string;
  choices: Choice[];
}

export interface RecommendedTool {
  toolName: string;
  badgeText: string;
  description: string;
  ctaText: string;
  affiliatePlaceholderUrl: string;
  category: ToolCategory;
}

export interface RecoveryStep {
  id: string;
  stepTitle: string;
  whyItMatters: string;
  exactInstructions: string;
  platformInstructions?: Partial<Record<DevicePlatform, string>>;
  severityWeight: number;
  showIf?: { questionId: string; anyOf: string[]; or?: { questionId: string; anyOf: string[] }[] };
  recommendedTool?: RecommendedTool;
  externalUrl?: string;
  externalLabel?: string;
}

export interface TriageScenario {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  heroHeadline: string;
  urgencyBadge: string;
  estimatedFixTime: string;
  intro: string;
  riskBase: number;
  icon: 'link' | 'bell' | 'package' | 'phone' | 'bank' | 'mail';
  questions: DiagnosticQuestion[];
  checklistSteps: RecoveryStep[];
}

const deviceQuestion: DiagnosticQuestion = {
  id: 'device',
  prompt: 'Which device were you using when this happened?',
  helper: 'We use this only to tailor the click-by-click instructions on this device.',
  choices: [
    { value: 'iphone', label: 'iPhone or iPad', riskDelta: 0 },
    { value: 'android', label: 'Android phone or tablet', riskDelta: 0 },
    { value: 'windows', label: 'Windows PC', riskDelta: 0 },
    { value: 'mac', label: 'Mac', riskDelta: 0 },
    { value: 'other', label: 'Not sure / another device', riskDelta: 0 },
  ],
};

const passwordTool: RecommendedTool = {
  toolName: 'Password manager',
  badgeText: 'Optional account-safety tool',
  description: 'A password manager can help you create and keep unique passwords. Choose one only if it fits your needs.',
  ctaText: 'Compare password managers',
  affiliatePlaceholderUrl: 'https://example.com/replace-with-your-affiliate-link/password-manager',
  category: 'password-manager',
};

const identityTool: RecommendedTool = {
  toolName: 'Identity monitoring',
  badgeText: 'Optional recovery support',
  description: 'If sensitive identity details were exposed, consider a reputable identity-protection service after contacting the affected financial institution.',
  ctaText: 'Review identity-protection options',
  affiliatePlaceholderUrl: 'https://example.com/replace-with-your-affiliate-link/identity-protection',
  category: 'identity-protection',
};

const securityTool: RecommendedTool = {
  toolName: 'Device security software',
  badgeText: 'Optional device check',
  description: 'Use built-in protections first. If you choose extra security software, download it from the vendor’s official site or app store.',
  ctaText: 'Review security options',
  affiliatePlaceholderUrl: 'https://example.com/replace-with-your-affiliate-link/device-security',
  category: 'antivirus',
};

const passwordSteps: RecoveryStep[] = [
  {
    id: 'secure-password',
    stepTitle: 'Change the password for the account you entered',
    whyItMatters: 'A password typed into a fake page should be treated as exposed. Go straight to the real service using its app or a web address you type yourself.',
    exactInstructions: 'Open the official app or type the service’s known address yourself. Change the password, then review recent sign-ins and sign out devices you do not recognize. Never reuse the exposed password.',
    platformInstructions: {
      iphone: 'Open the service’s official app (not the message link) → Account or Profile → Security → Change password. If you use iCloud Keychain, check Settings → Passwords for a security recommendation.',
      android: 'Open the official app → Profile or Account → Security → Change password. Update Android and use Google Password Manager only through Settings → Google → Password Manager.',
      windows: 'Type the service’s known web address into your browser → Account settings → Security → Change password. Do not use a link from the suspicious message.',
      mac: 'Open the official app or type the service’s known address → Account settings → Security → Change password. Review saved passwords in System Settings → Passwords.',
    },
    severityWeight: 22,
    showIf: { questionId: 'exposure', anyOf: ['password', 'payment', 'both'] },
    recommendedTool: passwordTool,
  },
  {
    id: 'unique-passwords',
    stepTitle: 'Replace the same password anywhere else you used it',
    whyItMatters: 'Scammers may try a stolen password on other popular accounts. Prioritize email, banking, shopping, and social accounts.',
    exactInstructions: 'Make a short list of accounts that shared the exposed password. Visit each official app or site directly and set a different password. Start with your email account because it can reset other accounts.',
    severityWeight: 15,
    showIf: { questionId: 'reuse', anyOf: ['yes', 'unsure'] },
    recommendedTool: passwordTool,
  },
  {
    id: 'protect-identity',
    stepTitle: 'Contact your bank or card issuer if payment details were entered',
    whyItMatters: 'A quick call using the number on your card or official statement can help the institution advise whether to freeze, replace, or monitor the account.',
    exactInstructions: 'Use the number printed on your card or a statement, or open the bank’s official app. Tell them what information you entered and when. Ask whether to lock or replace the card and review recent transactions.',
    severityWeight: 24,
    showIf: { questionId: 'exposure', anyOf: ['payment', 'both'] },
    recommendedTool: identityTool,
    externalUrl: 'https://www.identitytheft.gov/',
    externalLabel: 'IdentityTheft.gov recovery steps',
  },
  {
    id: 'mfa',
    stepTitle: 'Turn on two-step sign-in for your email and important accounts',
    whyItMatters: 'A second sign-in check can make it harder for someone to enter with only a password.',
    exactInstructions: 'In each official account’s Security settings, look for Two-factor authentication, 2-step verification, or Passkeys. Prefer an authenticator app or passkey when available; never share a one-time code with a caller or texter.',
    platformInstructions: {
      iphone: 'Use the account’s official app → Account → Security → Two-factor authentication. iPhone can also use passkeys and verification codes in Settings → Passwords.',
      android: 'Use the account’s official app → Account → Security → 2-step verification. Keep your authenticator app and Android system updated.',
      windows: 'Visit the account’s official website directly → Security → Two-factor authentication. Store recovery codes somewhere private and offline.',
      mac: 'Visit the account’s official website directly → Security → Two-factor authentication. Store recovery codes somewhere private and offline.',
    },
    severityWeight: 11,
  },
];

export const triageScenarios: TriageScenario[] = [
  {
    slug: 'clicked-suspicious-link',
    seoTitle: 'Clicked a Suspicious Link? Take These Steps Now',
    metaDescription: 'A calm, private checklist for what to do after clicking a suspicious link in a text or email, including passwords, payment details, and downloads.',
    heroHeadline: 'I clicked a weird link in a text or email',
    urgencyBadge: 'Link clicked',
    estimatedFixTime: '4–8 min',
    intro: 'Clicking a link alone does not automatically mean your device is hacked. The next steps depend on whether you entered information or downloaded anything.',
    riskBase: 34,
    icon: 'link',
    questions: [
      { id: 'exposure', prompt: 'What happened after you opened the page?', helper: 'Choose the closest match. You do not need to share any actual password or card details.', choices: [{ value: 'none', label: 'I only opened it; I entered nothing', riskDelta: 0 }, { value: 'password', label: 'I typed a password or sign-in code', riskDelta: 25 }, { value: 'payment', label: 'I entered bank, card, or identity details', riskDelta: 30 }, { value: 'both', label: 'I entered more than one kind of information', riskDelta: 34 }] },
      deviceQuestion,
      { id: 'reuse', prompt: 'Was the password you entered used on any other account?', helper: 'If you did not enter a password, choose “No password entered.”', choices: [{ value: 'yes', label: 'Yes, I reused it', riskDelta: 12 }, { value: 'no', label: 'No, it was unique', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 5 }, { value: 'not-entered', label: 'No password entered', riskDelta: 0 }] },
      { id: 'download', prompt: 'Did the page start a download or ask you to install anything?', helper: 'This includes an app, profile, browser extension, or remote-access tool.', choices: [{ value: 'yes', label: 'Yes, I downloaded or installed something', riskDelta: 18 }, { value: 'no', label: 'No', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 5 }] },
    ],
    checklistSteps: [
      { id: 'close-page', stepTitle: 'Close the page and do not return through the message', whyItMatters: 'The original link may continue to lead to an imitation site. You can check the real account later through its official app or a typed address.', exactInstructions: 'Close the suspicious tab or message. Do not reply, call a number shown on the page, or approve a sign-in prompt you did not request.', severityWeight: 10 },
      ...passwordSteps,
      { id: 'scan-download', stepTitle: 'Check your device if a file or app was downloaded', whyItMatters: 'An unexpected download deserves a check, especially if you opened the file or granted permissions.', exactInstructions: 'Do not open the file again. Update your device and use its built-in security tools to scan. Remove an app or profile you do not recognize; if you are unsure, ask a trusted technician before deleting work or system files.', platformInstructions: { iphone: 'If you installed a profile: Settings → General → VPN & Device Management. Remove only a profile you know you did not install; contact your organization if this is a managed phone.', android: 'Open Play Store → profile picture → Play Protect → Scan. Review Settings → Apps for recently installed apps you do not recognize.', windows: 'Open Windows Security → Virus & threat protection → Quick scan. Do not run the downloaded file.', mac: 'Open System Settings → General → Login Items & Extensions and review unfamiliar items. Update macOS, then use a trusted security tool if you still suspect malware.' }, severityWeight: 19, showIf: { questionId: 'download', anyOf: ['yes', 'unsure'] }, recommendedTool: securityTool },
      { id: 'report-phishing', stepTitle: 'Report and delete the message', whyItMatters: 'Reporting helps service providers and authorities identify phishing attempts.', exactInstructions: 'Forward a phishing text to 7726 (SPAM). You can forward a phishing email to reportphishing@apwg.org and report the attempt to ReportFraud.ftc.gov. Then delete it.', severityWeight: 6, externalUrl: 'https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams', externalLabel: 'FTC phishing guidance' },
    ],
  },
  {
    slug: 'weird-login-alert',
    seoTitle: 'Unexpected Login Alert? Secure Your Account Safely',
    metaDescription: 'Use this private step-by-step guide to check an unfamiliar login alert, secure the account, and protect reused passwords.',
    heroHeadline: 'I got a login alert I don’t recognize',
    urgencyBadge: 'Unrecognized sign-in',
    estimatedFixTime: '5–9 min',
    intro: 'Do not tap the alert’s link. Check the account from its official app or a web address you type yourself, then revoke access you do not recognize.',
    riskBase: 42,
    icon: 'bell',
    questions: [
      { id: 'confirmed', prompt: 'Can you confirm the sign-in in the official account activity page?', helper: 'Open the service independently—not through the alert link.', choices: [{ value: 'yes', label: 'Yes, I see a sign-in I did not make', riskDelta: 28 }, { value: 'no', label: 'No unfamiliar activity appears', riskDelta: 0 }, { value: 'unsure', label: 'I can’t access or check the activity', riskDelta: 8 }] },
      deviceQuestion,
      { id: 'password', prompt: 'Can you still sign in to the account?', helper: 'Do not share credentials here; this quiz stays on your device.', choices: [{ value: 'yes', label: 'Yes, I can still sign in', riskDelta: 0 }, { value: 'no', label: 'No, access seems changed or blocked', riskDelta: 22 }, { value: 'unsure', label: 'I have not tried from the official app/site', riskDelta: 4 }] },
      { id: 'reuse', prompt: 'Do you use that account password anywhere else?', helper: 'A reused password makes other accounts worth checking too.', choices: [{ value: 'yes', label: 'Yes, on at least one other account', riskDelta: 13 }, { value: 'no', label: 'No, it is unique', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 5 }] },
    ],
    checklistSteps: [
      { id: 'check-official', stepTitle: 'Verify the alert through the official account activity page', whyItMatters: 'Alerts can be spoofed. The account’s own activity page is a safer source than an email or text link.', exactInstructions: 'Open the account’s official app or type its known web address. Find Security, Recent activity, or Where you’re signed in. If you do not see the alert there, do not use its link.', severityWeight: 11 },
      { id: 'revoke-session', stepTitle: 'Sign out devices or sessions you do not recognize', whyItMatters: 'Removing an unknown session can cut off access without waiting for the next password reset.', exactInstructions: 'In Security or Devices, review active sessions. Sign out unfamiliar devices and remove unknown connected apps. If your account is locked, use the provider’s official account recovery page.', severityWeight: 20, showIf: { questionId: 'confirmed', anyOf: ['yes', 'unsure'] }, externalUrl: 'https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams', externalLabel: 'FTC account-safety guidance' },
      { id: 'recover-account', stepTitle: 'Use the official recovery flow if you cannot sign in', whyItMatters: 'If someone changed your password or recovery details, the service’s own recovery process is the safest route back in.', exactInstructions: 'Type the service’s known address or open its official app and choose account recovery. Do not pay a caller or share a recovery code with anyone who contacts you.', severityWeight: 22, showIf: { questionId: 'password', anyOf: ['no', 'unsure'] } },
      { id: 'change-account-password', stepTitle: 'Change the account password and turn on two-step sign-in', whyItMatters: 'A new unique password and a second sign-in check help protect an account after an unfamiliar sign-in.', exactInstructions: 'Open the service directly, change the password to a unique one, review active sessions, and enable two-step sign-in or a passkey in Security settings. Never share a sign-in code.', severityWeight: 21, showIf: { questionId: 'password', anyOf: ['yes'] }, recommendedTool: passwordTool },
      { id: 'check-reused-passwords', stepTitle: 'Change reused passwords on other important accounts', whyItMatters: 'Someone may try a password from one service on email, banking, or shopping accounts.', exactInstructions: 'From each service’s official app or site, set a different password. Start with email and financial accounts, and never reuse the exposed password.', severityWeight: 15, showIf: { questionId: 'reuse', anyOf: ['yes', 'unsure'] }, recommendedTool: passwordTool },
      { id: 'enable-two-step', stepTitle: 'Enable two-step sign-in for this account', whyItMatters: 'A second sign-in check adds protection if a password is guessed or exposed.', exactInstructions: 'In the official account’s Security settings, turn on two-step verification or add a passkey. Keep recovery codes private and never read a one-time code to a caller.', severityWeight: 12 },
      { id: 'recovery-settings', stepTitle: 'Review recovery email, phone, and forwarding settings', whyItMatters: 'An intruder may change account recovery options or add a rule that hides future security notices.', exactInstructions: 'In the account’s Security and Mail settings, verify recovery email and phone are yours. Check forwarding, filters, and connected apps for changes you did not make.', severityWeight: 15, showIf: { questionId: 'confirmed', anyOf: ['yes', 'unsure'] } },
    ],
  },
  {
    slug: 'usps-delivery-text',
    seoTitle: 'Clicked a Fake USPS or Package Delivery Text?',
    metaDescription: 'What to do after clicking or replying to a fake USPS delivery text, including checking payments, passwords, and phone settings.',
    heroHeadline: 'I clicked or replied to a fake delivery text',
    urgencyBadge: 'Delivery-text scam',
    estimatedFixTime: '4–7 min',
    intro: 'A delivery text may be trying to collect a small fee or personal details. Do not use its link; check tracking only through the carrier’s official site or app.',
    riskBase: 33,
    icon: 'package',
    questions: [
      { id: 'exposure', prompt: 'Did you enter anything on the delivery page?', helper: 'Choose all that best describes what you submitted.', choices: [{ value: 'none', label: 'No, I only opened the page', riskDelta: 0 }, { value: 'address', label: 'Name, address, or other personal details', riskDelta: 10 }, { value: 'payment', label: 'Card or bank details', riskDelta: 28 }, { value: 'password', label: 'A password or sign-in code', riskDelta: 24 }] },
      deviceQuestion,
      { id: 'install', prompt: 'Did you install an app, profile, or file from the link?', helper: 'A tracking page should not require a new app or device profile.', choices: [{ value: 'yes', label: 'Yes', riskDelta: 18 }, { value: 'no', label: 'No', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 5 }] },
      { id: 'charge', prompt: 'Do you see an unfamiliar charge or shipping fee?', helper: 'Check through your bank app or the number on your card.', choices: [{ value: 'yes', label: 'Yes, there is a charge', riskDelta: 18 }, { value: 'no', label: 'No charge that I can see', riskDelta: 0 }, { value: 'unsure', label: 'I have not checked yet', riskDelta: 4 }] },
    ],
    checklistSteps: [
      { id: 'carrier-check', stepTitle: 'Verify delivery status without the text link', whyItMatters: 'The real carrier can confirm whether a package needs attention without sending you through the suspicious page.', exactInstructions: 'Open the carrier’s official app or type its web address yourself. If you have a tracking number, enter it there. The USPS will not ask for payment through a suspicious unsolicited text link.', externalUrl: 'https://www.usps.com/', externalLabel: 'Open USPS.com', severityWeight: 8 },
      { id: 'card-action', stepTitle: 'Call your card issuer if you entered payment details or see a charge', whyItMatters: 'Your issuer can tell you whether the card should be locked or replaced and can review a suspicious charge.', exactInstructions: 'Call the number on the back of your card or use the bank’s official app. Do not call numbers in the text. Ask about locking/replacing the card and disputing any charge you did not make.', severityWeight: 22, showIf: { questionId: 'exposure', anyOf: ['payment'], or: [{ questionId: 'transaction', anyOf: ['yes'] }] } },
      { id: 'account-action', stepTitle: 'Change a password you entered and check for reuse', whyItMatters: 'A fake delivery page may imitate a carrier login to capture credentials.', exactInstructions: 'Open the real service directly and change the exposed password. If you reused it, change those passwords too—starting with email and banking.', severityWeight: 19, showIf: { questionId: 'exposure', anyOf: ['password'] }, recommendedTool: passwordTool },
      { id: 'remove-install', stepTitle: 'Review apps or profiles added after the message', whyItMatters: 'Unexpected installations can collect data or change device settings.', exactInstructions: 'Do not open the item again. Check your device’s app list and profile/device-management settings. Remove only items you know are unfamiliar; ask a trusted technician if you are uncertain.', platformInstructions: { iphone: 'Settings → General → VPN & Device Management; review unfamiliar profiles. Check App Library for apps you did not install.', android: 'Settings → Apps → See all apps; sort by recently installed if available. Run Play Store → profile → Play Protect → Scan.', windows: 'Settings → Apps → Installed apps; sort by install date. Then open Windows Security → Virus & threat protection → Quick scan.', mac: 'System Settings → General → Login Items & Extensions; review recent unfamiliar items and installed apps.' }, severityWeight: 18, showIf: { questionId: 'install', anyOf: ['yes', 'unsure'] }, recommendedTool: securityTool },
      { id: 'report-delivery', stepTitle: 'Block and report the fake text', whyItMatters: 'Reporting helps mobile carriers identify scam campaigns.', exactInstructions: 'Forward the message to 7726 (SPAM), then delete it. You can report a scam to the FTC at ReportFraud.ftc.gov.', severityWeight: 7, externalUrl: 'https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams', externalLabel: 'FTC phishing guidance' },
    ],
  },
  {
    slug: 'phone-acting-hacked',
    seoTitle: 'Phone Battery Draining or Acting Strange? A Safe Checkup',
    metaDescription: 'A practical iPhone and Android checkup for unusual battery drain, popups, apps, or settings changes without assuming your phone is hacked.',
    heroHeadline: 'My phone battery is draining and it’s acting strange',
    urgencyBadge: 'Device behaving oddly',
    estimatedFixTime: '6–12 min',
    intro: 'Battery drain has many causes, including aging batteries and recent updates. Check recent apps, permissions, and updates before assuming compromise.',
    riskBase: 27,
    icon: 'phone',
    questions: [
      { id: 'symptoms', prompt: 'What unusual behavior have you noticed?', helper: 'Choose the strongest signal you have seen recently.', choices: [{ value: 'battery', label: 'Mostly battery drain or heat', riskDelta: 2 }, { value: 'popups', label: 'Unexpected popups, redirects, or browser alerts', riskDelta: 15 }, { value: 'apps', label: 'An app I do not recognize or settings changed', riskDelta: 18 }, { value: 'accounts', label: 'Account alerts or messages I did not send', riskDelta: 25 }] },
      deviceQuestion,
      { id: 'installed', prompt: 'Did you recently install an app, profile, or configuration from a link?', helper: 'Think about the day symptoms started.', choices: [{ value: 'yes', label: 'Yes', riskDelta: 17 }, { value: 'no', label: 'No', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 5 }] },
      { id: 'money', prompt: 'Have you shared a password, payment detail, or verification code?', helper: 'A code is as sensitive as a password. No need to enter the code here.', choices: [{ value: 'yes', label: 'Yes', riskDelta: 26 }, { value: 'no', label: 'No', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 5 }] },
    ],
    checklistSteps: [
      { id: 'update-device', stepTitle: 'Install the latest system update', whyItMatters: 'Updates can include important fixes and also rule out a common cause of unusual device behavior.', exactInstructions: 'Connect to a trusted Wi-Fi network and install system updates from Settings. Avoid popups or web pages that ask you to install a “security patch.”', platformInstructions: { iphone: 'Settings → General → Software Update. Install an update offered by Apple.', android: 'Settings → System → Software update (wording varies by maker). Install updates offered in Settings or Google Play.', windows: 'Settings → Windows Update → Check for updates.', mac: 'Apple menu → System Settings → General → Software Update.' }, severityWeight: 12 },
      { id: 'review-apps', stepTitle: 'Review recent apps and high-use battery activity', whyItMatters: 'A newly installed or misbehaving app can explain battery drain without a breach.', exactInstructions: 'Look at battery usage and recently installed apps. Remove apps you do not recognize or no longer need; if it is a work device, ask your IT team first.', platformInstructions: { iphone: 'Settings → Battery to review usage. For a profile, Settings → General → VPN & Device Management.', android: 'Settings → Battery → Battery usage, then Settings → Apps → See all apps. Run Play Protect from the Play Store.', windows: 'Settings → System → Power & battery → Battery usage; review unfamiliar apps in Settings → Apps.', mac: 'System Settings → Battery and Activity Monitor; review Login Items under General.' }, severityWeight: 18, showIf: { questionId: 'installed', anyOf: ['yes', 'unsure'] }, recommendedTool: securityTool },
      { id: 'browser-notifications', stepTitle: 'Turn off suspicious website notifications', whyItMatters: 'Some fake “virus” alerts are browser notifications from websites, not device infections.', exactInstructions: 'Open your browser settings and remove notification permission for sites you do not recognize. Close any page urging you to call a support number.', platformInstructions: { iphone: 'Settings → Apps → Safari → turn on Block Pop-ups. In Safari, close suspicious tabs; do not call numbers in webpage warnings.', android: 'Chrome → ⋮ → Settings → Site settings → Notifications; remove unknown sites. Chrome → Settings → Site settings → Pop-ups and redirects → Blocked.', windows: 'In Edge: Settings → Cookies and site permissions → Notifications; remove unknown sites. Close the fake alert tab.', mac: 'Safari → Settings → Websites → Notifications; deny unknown sites. Safari → Settings → Security → Block pop-up windows.' }, severityWeight: 13, showIf: { questionId: 'symptoms', anyOf: ['popups'] } },
      { id: 'secure-accounts', stepTitle: 'Secure accounts if you shared a password or code', whyItMatters: 'A device symptom plus a shared sign-in secret deserves an account check, not just a device scan.', exactInstructions: 'From a separate trusted device if possible, open the affected service directly. Change the password, sign out unknown sessions, and contact your bank if payment information was involved.', severityWeight: 22, showIf: { questionId: 'money', anyOf: ['yes', 'unsure'] }, recommendedTool: passwordTool },
      { id: 'trusted-support', stepTitle: 'Ask a trusted technician if symptoms continue', whyItMatters: 'A professional can inspect the device without sending you to an unsolicited “support” number.', exactInstructions: 'Use the manufacturer’s official support channel, your organization’s IT team, or a technician you already trust. Do not grant remote access to someone who contacted you unexpectedly.', severityWeight: 8 },
    ],
  },
  {
    slug: 'bank-fraud-text',
    seoTitle: 'Bank Fraud Text? Verify It Without Tapping the Link',
    metaDescription: 'Safe next steps for suspicious bank-charge texts, including verifying with your bank, protecting a card, and reporting a scam text.',
    heroHeadline: 'I got a text asking me to verify a bank charge',
    urgencyBadge: 'Possible bank impersonation',
    estimatedFixTime: '4–7 min',
    intro: 'A real bank may send alerts, but a text asking you to tap a link or share a code can be spoofed. Verify through the bank’s official app or the number on your card.',
    riskBase: 38,
    icon: 'bank',
    questions: [
      { id: 'clicked', prompt: 'Did you tap the link or reply to the text?', helper: 'If you did, the rest of the questions help tailor the next steps.', choices: [{ value: 'no', label: 'No, I have not interacted', riskDelta: 0 }, { value: 'clicked', label: 'I opened the link but entered nothing', riskDelta: 9 }, { value: 'replied', label: 'I replied or called the number', riskDelta: 11 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 4 }] },
      deviceQuestion,
      { id: 'exposure', prompt: 'Did you share card details, a password, or a one-time code?', helper: 'Your bank will never need you to tell a caller your one-time code.', choices: [{ value: 'none', label: 'No', riskDelta: 0 }, { value: 'payment', label: 'Card or bank details', riskDelta: 28 }, { value: 'password', label: 'Password or sign-in code', riskDelta: 24 }, { value: 'both', label: 'More than one of these', riskDelta: 32 }] },
      { id: 'transaction', prompt: 'Do you see a transaction you do not recognize in the official bank app?', helper: 'Open the app yourself; do not follow the message link.', choices: [{ value: 'yes', label: 'Yes, there is an unfamiliar transaction', riskDelta: 24 }, { value: 'no', label: 'No', riskDelta: 0 }, { value: 'unsure', label: 'I have not checked', riskDelta: 5 }] },
    ],
    checklistSteps: [
      { id: 'bank-official', stepTitle: 'Contact your bank through a trusted channel', whyItMatters: 'A verified channel lets your bank confirm whether the alert is real and secure your account if needed.', exactInstructions: 'Open your bank’s official app or call the number on your card or statement. Ask whether the alert is genuine and whether your card or online access needs to be locked.', severityWeight: 15 },
      { id: 'card-lock', stepTitle: 'Ask the bank to lock or replace a card if details were shared', whyItMatters: 'Your bank can make the right call for the specific card and transaction history.', exactInstructions: 'Tell the bank what details you provided and when. Ask them to lock or replace the card and dispute any unauthorized transaction. Do not send money to “reverse” a transfer based on a caller’s instructions.', severityWeight: 25, showIf: { questionId: 'exposure', anyOf: ['payment', 'both'] } },
      ...passwordSteps,
      { id: 'transaction-dispute', stepTitle: 'Report any unauthorized transaction immediately', whyItMatters: 'Fast reporting gives your bank a chance to investigate and explain dispute options.', exactInstructions: 'Use the bank’s official app or phone number to report the charge. Save the date, amount, and case number; do not include card details in this checklist.', severityWeight: 22, showIf: { questionId: 'transaction', anyOf: ['yes'] } },
      { id: 'block-text', stepTitle: 'Forward the suspicious text to 7726 and delete it', whyItMatters: 'This helps your carrier identify scam messages and prevents an accidental return to the link.', exactInstructions: 'Forward the message to 7726 (SPAM). Report it to the FTC at ReportFraud.ftc.gov, then delete it.', severityWeight: 7, externalUrl: 'https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams', externalLabel: 'FTC phishing guidance' },
    ],
  },
  {
    slug: 'email-account-compromised',
    seoTitle: 'Email Password Changed or Spam Sent? Recover Your Account',
    metaDescription: 'A private recovery checklist for email accounts with changed passwords, suspicious forwarding rules, or spam sent to contacts.',
    heroHeadline: 'My email password changed—or friends got spam from me',
    urgencyBadge: 'Email account recovery',
    estimatedFixTime: '7–12 min',
    intro: 'Email controls password resets for many services, so secure it first. Use the provider’s official recovery page and never share a recovery code with anyone who calls you.',
    riskBase: 54,
    icon: 'mail',
    questions: [
      { id: 'access', prompt: 'Can you still sign in to the email account?', helper: 'Use the email provider’s app or type its known web address.', choices: [{ value: 'yes', label: 'Yes, I can get in', riskDelta: 0 }, { value: 'no', label: 'No, my password or recovery details changed', riskDelta: 24 }, { value: 'unsure', label: 'I have not tried the official recovery flow', riskDelta: 5 }] },
      deviceQuestion,
      { id: 'activity', prompt: 'Have you seen messages, rules, or devices you did not add?', helper: 'Examples include spam sent to contacts, forwarding rules, or unknown sessions.', choices: [{ value: 'yes', label: 'Yes, there are signs of activity', riskDelta: 21 }, { value: 'no', label: 'No signs beyond the alert', riskDelta: 0 }, { value: 'unsure', label: 'I have not checked yet', riskDelta: 6 }] },
      { id: 'reuse', prompt: 'Was the email password reused on other accounts?', helper: 'Start password changes with other accounts that can be reset through this email.', choices: [{ value: 'yes', label: 'Yes', riskDelta: 15 }, { value: 'no', label: 'No, it was unique', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 6 }] },
    ],
    checklistSteps: [
      { id: 'recover-email', stepTitle: 'Recover access using the email provider’s official page', whyItMatters: 'Email is often the reset route for financial, shopping, and social accounts.', exactInstructions: 'Type the provider’s known address yourself and choose account recovery or “Forgot password.” Do not use a recovery link sent by an unexpected caller or texter. If you cannot sign in, follow the provider’s official identity-check process.', severityWeight: 23, showIf: { questionId: 'access', anyOf: ['no', 'unsure'] } },
      { id: 'email-password', stepTitle: 'Set a new unique password and sign out other sessions', whyItMatters: 'A new unique password and session review help restore control after an account takeover.', exactInstructions: 'After regaining access, set a password you have never used elsewhere. In Security, sign out devices you do not recognize and remove unknown connected apps.', severityWeight: 23, showIf: { questionId: 'access', anyOf: ['yes', 'unsure'] }, recommendedTool: passwordTool },
      { id: 'mail-rules', stepTitle: 'Check forwarding, filters, recovery contacts, and sent mail', whyItMatters: 'Attackers may add rules to hide security emails or keep receiving a copy of your messages.', exactInstructions: 'In Mail settings, review forwarding addresses, filters/rules, recovery email and phone, and recent sent/deleted mail. Remove only changes you did not make.', severityWeight: 18, showIf: { questionId: 'activity', anyOf: ['yes', 'unsure'] } },
      { id: 'other-accounts', stepTitle: 'Change reused passwords on other important accounts', whyItMatters: 'A compromised inbox can expose password-reset links for other services.', exactInstructions: 'From each service’s official app or site, update reused passwords. Prioritize banking, payment apps, cloud storage, and social media. Enable two-step sign-in.', severityWeight: 20, showIf: { questionId: 'reuse', anyOf: ['yes', 'unsure'] }, recommendedTool: passwordTool },
      { id: 'warn-contacts', stepTitle: 'Let contacts know not to trust recent unusual messages', whyItMatters: 'Friends may receive convincing scam links from your address while you are recovering access.', exactInstructions: 'Once you can safely use another trusted channel, tell close contacts to ignore unexpected links or money requests sent from your account during the incident.', severityWeight: 10, showIf: { questionId: 'activity', anyOf: ['yes'] } },
      { id: 'identity-check', stepTitle: 'Contact your bank if financial or identity details were exposed', whyItMatters: 'The email compromise may connect to other accounts if financial documents or recovery messages were accessible.', exactInstructions: 'Call your bank using the number on your card or statement if you see unauthorized activity or shared sensitive details. For identity theft, use IdentityTheft.gov for a tailored recovery plan.', severityWeight: 17, recommendedTool: identityTool, externalUrl: 'https://www.identitytheft.gov/', externalLabel: 'IdentityTheft.gov recovery steps' },
    ],
  },
];

export function getTriageScenario(slug: string) {
  return triageScenarios.find((scenario) => scenario.slug === slug);
}
