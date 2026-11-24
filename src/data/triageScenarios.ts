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

export interface ScenarioFaq {
  question: string;
  answer: string;
}

export interface ScenarioSeoGuide {
  whatHappensSummary: string;
  doNotDo: string[];
  commonRedFlags: string[];
  faqs: ScenarioFaq[];
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
  seoGuide?: ScenarioSeoGuide;
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

const dataRemovalTool: RecommendedTool = {
  toolName: 'Data-broker removal service',
  badgeText: 'Optional privacy reduction',
  description: 'Data-removal tools submit opt-out requests to public people-search databases so scammers have fewer personal details to target you with.',
  ctaText: 'Review data-removal options',
  affiliatePlaceholderUrl: 'https://example.com/replace-with-your-affiliate-link/data-removal',
  category: 'data-removal',
};

const hardwareKeyTool: RecommendedTool = {
  toolName: 'YubiKey 5 NFC Hardware Security Key',
  badgeText: 'Phishing-proof 2FA upgrade · Amazon',
  description: 'SMS codes can be phished or read aloud to callers. A physical YubiKey taps to your phone or computer and blocks sign-ins on fake look-alike websites.',
  ctaText: 'See YubiKey 5 NFC on Amazon',
  affiliatePlaceholderUrl: 'https://www.amazon.com/s?k=YubiKey+5+NFC+security+key&tag=breachresponsekit-20',
  category: 'hardware-key',
};

const usbBlockerTool: RecommendedTool = {
  toolName: 'USB Data-Only Charging Blocker',
  badgeText: 'Public charging protection · Amazon',
  description: 'Blocks data pins on airport, hotel, and rental-car USB ports so public chargers can only deliver power—never access your phone data.',
  ctaText: 'See USB data blockers on Amazon',
  affiliatePlaceholderUrl: 'https://www.amazon.com/s?k=PortaPow+USB+C+data+blocker&tag=breachresponsekit-20',
  category: 'hardware-key',
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
    recommendedTool: hardwareKeyTool,
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
    seoGuide: {
      whatHappensSummary: 'Most phishing links lead to a look-alike login or payment form rather than silently infecting an up-to-date phone or computer. If you closed the tab without typing credentials or installing a file, your immediate exposure is usually low.',
      doNotDo: [
        'Do not re-open the link to double-check the URL or take screenshots of login forms.',
        'Do not reply "STOP" to unknown spam texts—replying confirms your phone number is active.',
        'Do not call any toll-free support number displayed on a pop-up warning page.',
      ],
      commonRedFlags: [
        'Shortened URLs (bit.ly, tinyurl) or misspelled brand domains like paypa1-support.com.',
        'Urgent countdown timers claiming your account will be closed in 24 hours.',
        'Requests for a 6-digit one-time verification code sent via SMS.',
      ],
      faqs: [
        {
          question: 'Can clicking a link on an iPhone or Android hack my phone automatically?',
          answer: 'On modern, updated iPhones and Android devices, simply opening a webpage in Safari or Chrome rarely compromises the device by itself. Risk rises sharply only if you type a password, enter payment details, or install an app or configuration profile.',
        },
        {
          question: 'What if I clicked a phishing link on my work computer?',
          answer: 'Disconnect from any sensitive internal tools and notify your company’s IT or security helpdesk right away so they can check network logs and reset your work session tokens.',
        },
        {
          question: 'Should I turn off Wi-Fi after clicking a suspicious link?',
          answer: 'If you downloaded a file or granted remote access to a caller, disconnecting Wi-Fi or enabling Airplane Mode temporarily prevents data transfer while you remove the software.',
        },
      ],
    },
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
      { id: 'enable-two-step', stepTitle: 'Enable two-step sign-in or a hardware key for this account', whyItMatters: 'A physical security key or authenticator app stops attackers even if they guess your password.', exactInstructions: 'In the official account’s Security settings, turn on two-step verification or register a physical YubiKey. Keep recovery codes private and never read a one-time code to a caller.', severityWeight: 12, recommendedTool: hardwareKeyTool },
      { id: 'recovery-settings', stepTitle: 'Review recovery email, phone, and forwarding settings', whyItMatters: 'An intruder may change account recovery options or add a rule that hides future security notices.', exactInstructions: 'In the account’s Security and Mail settings, verify recovery email and phone are yours. Check forwarding, filters, and connected apps for changes you did not make.', severityWeight: 15, showIf: { questionId: 'confirmed', anyOf: ['yes', 'unsure'] } },
    ],
    seoGuide: {
      whatHappensSummary: 'An unrecognized login alert happens either because a scammer sent a fake security email to trick you into clicking "Review Activity," or because someone guessed or leaked your password in a credential-stuffing attack.',
      doNotDo: [
        'Never click the "This wasn’t me" button directly inside a suspicious email or text.',
        'Do not approve unexpected two-factor push prompts on your phone ("MFA fatigue" attacks).',
        'Do not reuse a variation of your old password (like adding "1" or "!" at the end).',
      ],
      commonRedFlags: [
        'Sign-in location listed in another state or country (note: mobile carriers sometimes route IP addresses through nearby cities).',
        'Multiple two-factor authentication codes arriving when you are not trying to log in.',
        'Third-party apps newly granted access in your Google, Apple, or Microsoft security dashboard.',
      ],
      faqs: [
        {
          question: 'Why does my login alert show a city hours away from where I live?',
          answer: 'Cellular data networks and VPNs often route traffic through regional hubs hundreds of miles away. Check the timestamp and device type first—if it matches the exact moment you signed in on your phone, it may be your own connection.',
        },
        {
          question: 'Does changing my password automatically kick an intruder out?',
          answer: 'Not always. Many apps keep active session tokens signed in even after a password reset. Always use the "Sign out of all devices" button in your Security settings after changing your password.',
        },
      ],
    },
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
      { id: 'card-action', stepTitle: 'Call your card issuer if you entered payment details or see a charge', whyItMatters: 'Your issuer can tell you whether the card should be locked or replaced and can review a suspicious charge.', exactInstructions: 'Call the number on the back of your card or use the bank’s official app. Do not call numbers in the text. Ask about locking/replacing the card and disputing any charge you did not make.', severityWeight: 22, showIf: { questionId: 'exposure', anyOf: ['payment'], or: [{ questionId: 'charge', anyOf: ['yes'] }] } },
      { id: 'account-action', stepTitle: 'Change a password you entered and check for reuse', whyItMatters: 'A fake delivery page may imitate a carrier login to capture credentials.', exactInstructions: 'Open the real service directly and change the exposed password. If you reused it, change those passwords too—starting with email and banking.', severityWeight: 19, showIf: { questionId: 'exposure', anyOf: ['password'] }, recommendedTool: passwordTool },
      { id: 'remove-install', stepTitle: 'Review apps or profiles added after the message', whyItMatters: 'Unexpected installations can collect data or change device settings.', exactInstructions: 'Do not open the item again. Check your device’s app list and profile/device-management settings. Remove only items you know are unfamiliar; ask a trusted technician if you are uncertain.', platformInstructions: { iphone: 'Settings → General → VPN & Device Management; review unfamiliar profiles. Check App Library for apps you did not install.', android: 'Settings → Apps → See all apps; sort by recently installed if available. Run Play Store → profile → Play Protect → Scan.', windows: 'Settings → Apps → Installed apps; sort by install date. Then open Windows Security → Virus & threat protection → Quick scan.', mac: 'System Settings → General → Login Items & Extensions; review recent unfamiliar items and installed apps.' }, severityWeight: 18, showIf: { questionId: 'install', anyOf: ['yes', 'unsure'] }, recommendedTool: securityTool },
      { id: 'report-delivery', stepTitle: 'Block and report the fake text', whyItMatters: 'Reporting helps mobile carriers identify scam campaigns.', exactInstructions: 'Forward the message to 7726 (SPAM), then delete it. You can report a scam to the FTC at ReportFraud.ftc.gov.', severityWeight: 7, externalUrl: 'https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams', externalLabel: 'FTC phishing guidance' },
    ],
    seoGuide: {
      whatHappensSummary: 'Fake USPS, UPS, and FedEx "smishing" texts claim a package is held at a warehouse due to an incomplete address and ask for a small $0.30 to $3.00 redelivery fee. Their real goal is capturing your credit card number and billing details.',
      doNotDo: [
        'Do not reply "Y" or "YES" as instructed by the text message to activate links.',
        'Do not pay even a tiny 30-cent redelivery fee—scammers use small amounts to make you drop your guard.',
        'Do not assume your card is safe just because no charge appeared immediately; criminals often test cards days later.',
      ],
      commonRedFlags: [
        'Text sent from an international country code (such as +44, +63, or +234) or a random Gmail/iCloud email address.',
        'Web links that do not end in official domains like usps.com, ups.com, or fedex.com.',
        'Messages asking you to reply "Y", exit the text, and reopen it to make the link clickable (a trick used to bypass iMessage link filters).',
      ],
      faqs: [
        {
          question: 'I entered my credit card on a fake USPS site—what happens next?',
          answer: 'Call the fraud number on the back of your card immediately and ask them to cancel the card number and issue a replacement. Also ask them to disable automatic merchant billing updates so recurring fraud attempts do not carry over to the new card.',
        },
        {
          question: 'I only typed my name and home address, not my credit card. Am I at risk?',
          answer: 'Your name and home address are already widely listed in public data-broker directories, so entering them alone does not give scammers access to your bank accounts. Expect an uptick in follow-up spam texts and watch closely for more convincing impersonation attempts.',
        },
      ],
    },
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
      { id: 'trusted-support', stepTitle: 'Protect public charging ports and ask a trusted technician if symptoms continue', whyItMatters: 'Using your own wall adapter (or a USB data blocker) prevents untrusted public ports from prompting data connections, and a local technician can inspect persistent issues safely.', exactInstructions: 'Avoid plugging directly into public USB data ports without a data-blocking adapter. For persistent issues, use the manufacturer’s official support channel or a local technician you trust.', severityWeight: 8, recommendedTool: usbBlockerTool },
    ],
    seoGuide: {
      whatHappensSummary: 'Sudden battery drain, overheating, or pop-up notifications are most often caused by rogue browser notification permissions, background app indexing after an OS update, or a weak cellular signal—not remote spyware.',
      doNotDo: [
        'Do not download "Phone Cleaner" or "Battery Booster" apps from pop-up ads.',
        'Do not pay online "cyber investigators" who promise to trace hackers on your phone.',
        'Do not ignore genuine signs of account takeover (such as Sent texts you did not write or SIM card loss of service).',
      ],
      commonRedFlags: [
        'Repeated fake "Your iPhone/Android is infected (4 viruses)" banners coming from Chrome or Safari notifications.',
        'Sudden loss of cellular bars ("SOS Only" or "No SIM"), which can indicate a SIM-swap attack.',
        'Unknown Device Management (MDM) profiles or Accessibility permissions enabled.',
      ],
      faqs: [
        {
          question: 'Why does my phone keep popping up fake McAfee or Norton virus warnings?',
          answer: 'You accidentally tapped "Allow" on a website notification prompt. Your phone is not infected—go into Chrome or Safari site settings and revoke notification permissions for unfamiliar websites.',
        },
        {
          question: 'When should I factory reset my phone?',
          answer: 'A factory reset is only necessary if you installed an unverified app outside the official app store (sideloaded an APK or configuration profile) and cannot remove it normally. Back up your photos first and sign into your Apple ID or Google account from a clean device to verify security settings.',
        },
      ],
    },
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
    seoGuide: {
      whatHappensSummary: 'Bank impersonation scams use spoofed caller IDs and fake fraud alerts to panic you into handing over your online banking login or reading aloud a one-time passcode—which scammers immediately use to drain accounts via Zelle or wire transfer.',
      doNotDo: [
        'Never read a 6-digit verification code to anyone calling you—even if Caller ID shows your bank’s real name.',
        'Never transfer money to a "safe account" or "holding account" at a caller’s direction.',
        'Never tap links in fraud-alert texts; legitimate banks only ask you to reply YES/NO without links.',
      ],
      commonRedFlags: [
        'A follow-up phone call minutes after you reply "NO" to a fraud text, claiming to be the bank’s Fraud Prevention Department.',
        'Requests for your debit card PIN, full Social Security number, or one-time login passcode.',
        'Links leading to look-alike domains instead of your bank’s official mobile app.',
      ],
      faqs: [
        {
          question: 'Why did the caller know my name, address, and the last 4 digits of my card?',
          answer: 'Scammers buy leaked consumer profiles from data breaches and public data brokers to make their calls sound legitimate. Knowing basic personal info does not mean they are from your bank.',
        },
        {
          question: 'How do I verify if a fraud text from Chase, Bank of America, or Wells Fargo is real?',
          answer: 'Ignore the text completely, open your bank’s official mobile app directly, or call the customer service number printed on the back of your physical debit or credit card.',
        },
      ],
    },
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
    seoGuide: {
      whatHappensSummary: 'Your primary email account is the master key to your digital life because it receives password-reset links for your banks, shopping apps, and social media. Attackers often hide silent auto-forwarding rules inside your inbox settings so they can keep reading your mail even after you change your password.',
      doNotDo: [
        'Do not stop at changing your password—always inspect Mail Forwarding and Filter/Rule settings.',
        'Do not pay third-party "account recovery hackers" on social media or forums; they are recovery scammers.',
        'Do not leave old phone numbers or secondary emails attached to your recovery settings.',
      ],
      commonRedFlags: [
        'Inbox filters sending emails from banks, Amazon, or PayPal straight to Trash or Archive.',
        'Unknown email addresses listed under Settings → Forwarding and POP/IMAP.',
        'Replies bouncing back from contacts you never emailed.',
      ],
      faqs: [
        {
          question: 'Why are my friends getting spam from my email address even though I changed my password?',
          answer: 'Either the attacker still has an active logged-in session token (use "Sign out all other sessions" in Security settings), or they spoofed your "From" display name using an external server—which does not require access to your inbox.',
        },
        {
          question: 'Which accounts should I check first after my email was hacked?',
          answer: 'Check your primary bank, credit cards, payment apps (PayPal, Venmo, Cash App), Apple ID / Google account, and tax or investment portals, as attackers search inboxes for financial statements and password reset links.',
        },
      ],
    },
  },
  {
    slug: 'instagram-account-hacked',
    seoTitle: 'Instagram Hacked & Email or Password Changed? Recovery Steps',
    metaDescription: 'Step-by-step Instagram account recovery checklist when a hacker changes your email, phone number, or two-factor authentication.',
    heroHeadline: 'My Instagram was hacked and the email or password changed',
    urgencyBadge: 'Social account takeover',
    estimatedFixTime: '6–10 min',
    intro: 'Act quickly before the attacker messages your followers with crypto or cash-app scams. Use Instagram’s official in-app recovery flow and check the email linked to your account.',
    riskBase: 52,
    icon: 'bell',
    questions: [
      { id: 'access', prompt: 'Can you still access your Instagram account or revert email?', helper: 'Check your inbox for a security email from security@mail.instagram.com.', choices: [{ value: 'revert', label: 'I have the "Email changed" link from Instagram', riskDelta: 10 }, { value: 'locked', label: 'I am completely locked out', riskDelta: 26 }, { value: 'in', label: 'I am still signed in on one device', riskDelta: 8 }] },
      deviceQuestion,
      { id: 'email_safe', prompt: 'Is the email account linked to Instagram still secure?', helper: 'Hackers often break into your email first to delete Instagram’s alert.', choices: [{ value: 'yes', label: 'Yes, my email is secure', riskDelta: 0 }, { value: 'no', label: 'No, my email was also compromised', riskDelta: 24 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 8 }] },
      { id: 'reuse', prompt: 'Did you use that Instagram password on any other site?', helper: 'Credential stuffing is the #1 way Instagram accounts get taken over.', choices: [{ value: 'yes', label: 'Yes, I reused it', riskDelta: 14 }, { value: 'no', label: 'No, it was unique', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 6 }] },
    ],
    checklistSteps: [
      { id: 'ig-revert', stepTitle: 'Click "Secure my account" in Instagram’s official email alert', whyItMatters: 'When your email is changed, Instagram sends a time-sensitive revert link to your original email address.', exactInstructions: 'Search your inbox (and Trash/Spam) for messages from security@mail.instagram.com. If you see "Your email address was changed," tap the built-in "secure your account here" link immediately to undo the change.', severityWeight: 24, showIf: { questionId: 'access', anyOf: ['revert', 'locked'] } },
      { id: 'ig-selfie', stepTitle: 'Request a login link or video selfie verification in the Instagram app', whyItMatters: 'If the hacker changed both email and phone, Instagram’s official video-selfie check can verify your identity against photos on your profile.', exactInstructions: 'Open the official Instagram app → tap "Get help logging in" (Android) or "Forgot password?" (iPhone) → tap "Need more help?" → "I can’t access this email or phone number" and follow the official on-screen prompts.', severityWeight: 22, showIf: { questionId: 'access', anyOf: ['locked'] }, externalUrl: 'https://help.instagram.com/149494825257596', externalLabel: 'Official Instagram Help Center' },
      { id: 'ig-sessions', stepTitle: 'Remove unknown devices, Meta Accounts Center links, and 2FA apps', whyItMatters: 'Hackers often link their own Facebook account in Accounts Center or add their own authenticator app to lock you back out.', exactInstructions: 'Go to Instagram Settings → Accounts Center → Password and security → Where you’re logged in and log out all unrecognized devices. Also check Accounts Center → Accounts and remove any unfamiliar Facebook profile.', severityWeight: 20, recommendedTool: passwordTool },
      { id: 'ig-email-check', stepTitle: 'Secure your email inbox and check Trash for deleted Instagram alerts', whyItMatters: 'If an attacker accessed your email, they can intercept future Instagram password resets.', exactInstructions: 'Change your email password, turn on two-step verification on your email, and check your email Trash folder and Forwarding settings.', severityWeight: 18, showIf: { questionId: 'email_safe', anyOf: ['no', 'unsure'] }, recommendedTool: passwordTool },
      { id: 'ig-reuse', stepTitle: 'Change reused passwords on other accounts', whyItMatters: 'Prevent follow-up takeovers on your email, shopping, or banking apps.', exactInstructions: 'Update any other service that shared your old Instagram password using a unique password for each.', severityWeight: 14, showIf: { questionId: 'reuse', anyOf: ['yes', 'unsure'] }, recommendedTool: passwordTool },
    ],
    seoGuide: {
      whatHappensSummary: 'Most Instagram takeovers happen through credential stuffing (reusing a password leaked on another site) or fake "copyright violation" and "brand collaboration" phishing messages. Once inside, scammers message your friends asking for urgent money transfers.',
      doNotDo: [
        'NEVER pay anyone on Instagram, X, or TikTok claiming to be an "ethical hacker" who can recover your account—100% of those are secondary scams.',
        'Do not enter your Instagram login into third-party "Who viewed my profile" or "Follower tracker" apps.',
        'Do not ignore Meta Accounts Center—removing the hacker’s password is useless if their Facebook account is still linked to your Instagram.',
      ],
      commonRedFlags: [
        'Direct messages from a friend’s account asking you to vote in a contest or send them a 6-digit SMS link.',
        'Emails claiming your account will be deleted in 24 hours for a copyright violation.',
        'Sudden posts on your grid promoting cryptocurrency giveaways or fake investment returns.',
      ],
      faqs: [
        {
          question: 'How did someone bypass my Instagram two-factor authentication?',
          answer: 'If you clicked a phishing link or logged into a fake collaboration portal, the site captured both your password and your one-time 6-digit code in real time, then immediately registered their own authenticator app.',
        },
        {
          question: 'Can Instagram Support recover my account if the hacker deleted my photos?',
          answer: 'Yes—Instagram’s automated video-selfie verification compares your live face scan against historical profile data stored on their servers even if the hacker archived or deleted your public posts.',
        },
      ],
    },
  },
  {
    slug: 'facebook-account-hacked',
    seoTitle: 'Facebook Hacked & Email or Password Changed? Recovery Guide',
    metaDescription: 'How to recover a hacked Facebook account when the email, phone number, or password has been changed, plus how to protect linked ad accounts.',
    heroHeadline: 'My Facebook was hacked and I’m locked out',
    urgencyBadge: 'Facebook takeover',
    estimatedFixTime: '7–12 min',
    intro: 'Facebook takeovers often target saved payment methods in Meta Pay or Facebook Ads Manager alongside your personal profile. Use Facebook’s official compromised-account flow right away.',
    riskBase: 55,
    icon: 'bell',
    questions: [
      { id: 'access', prompt: 'What is your current access status on Facebook?', helper: 'Check the email account you originally used to sign up for Facebook.', choices: [{ value: 'locked', label: 'Email/password changed and I am locked out', riskDelta: 26 }, { value: 'in', label: 'I can still get in, but see strange activity', riskDelta: 12 }, { value: 'disabled', label: 'My account was suspended after the hack', riskDelta: 24 }] },
      deviceQuestion,
      { id: 'payments', prompt: 'Did you have a card or PayPal saved in Meta Pay or Facebook Ads?', helper: 'Hackers frequently run unauthorized ads on compromised profiles.', choices: [{ value: 'yes', label: 'Yes, payment details were saved', riskDelta: 25 }, { value: 'no', label: 'No payment methods saved', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 8 }] },
      { id: 'reuse', prompt: 'Was that Facebook password reused on your email or other sites?', helper: 'Securing your email prevents the hacker from re-entering.', choices: [{ value: 'yes', label: 'Yes', riskDelta: 15 }, { value: 'no', label: 'No', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 6 }] },
    ],
    checklistSteps: [
      { id: 'fb-hacked-url', stepTitle: 'Start at Facebook’s official compromised-account page', whyItMatters: 'Facebook’s dedicated recovery flow lets you identify your account using an old password or linked profile even after the email was swapped.', exactInstructions: 'Type facebook.com/hacked directly into your browser (ideally on a phone or computer you previously used to log into Facebook) and follow the official identity verification steps.', severityWeight: 25, externalUrl: 'https://www.facebook.com/hacked', externalLabel: 'Open Facebook.com/hacked' },
      { id: 'fb-email-revert', stepTitle: 'Check your email for Facebook’s "Did you change your email?" alert', whyItMatters: 'Facebook sends a rollback link to your previous email address when contact info is modified.', exactInstructions: 'Search your email inbox and Trash for messages from security@facebookmail.com and click the official link to revert the email change.', severityWeight: 20, showIf: { questionId: 'access', anyOf: ['locked', 'disabled'] } },
      { id: 'fb-payments', stepTitle: 'Check Meta Pay, Ads Manager, and notify your bank if charges appear', whyItMatters: 'Attackers routinely spend thousands on Facebook Ads using saved cards before the owner regains access.', exactInstructions: 'Once back in, check Settings → Orders and payments (Meta Pay) and facebook.com/adsmanager for unauthorized campaigns. If you see unknown charges, call your bank immediately.', severityWeight: 22, showIf: { questionId: 'payments', anyOf: ['yes', 'unsure'] }, recommendedTool: identityTool },
      { id: 'fb-security', stepTitle: 'Log out all devices, remove unknown admins, and enable 2FA', whyItMatters: 'Hackers often add themselves as admins on your Facebook Pages or link a rogue Instagram account.', exactInstructions: 'Go to Settings → Accounts Center → Password and security → Where you’re logged in and log out every unrecognized session. Turn on Two-Factor Authentication using an authenticator app.', severityWeight: 18, recommendedTool: passwordTool },
      { id: 'fb-reuse', stepTitle: 'Update reused passwords on your email and other accounts', whyItMatters: 'Stops the attacker from using the same password elsewhere.', exactInstructions: 'Change your email password and any other account that shared your old Facebook password.', severityWeight: 14, showIf: { questionId: 'reuse', anyOf: ['yes', 'unsure'] }, recommendedTool: passwordTool },
    ],
    seoGuide: {
      whatHappensSummary: 'Facebook accounts are high-value targets because they are often connected to Meta Pay, business pages, and external apps via "Continue with Facebook." Hackers quickly swap the primary email, enable their own 2FA, and run unauthorized ad campaigns.',
      doNotDo: [
        'Do not trust anyone on X, Reddit, or Telegram offering "Meta insider recovery" for a fee.',
        'Do not create a brand-new Facebook account before attempting recovery on a recognized device via facebook.com/hacked.',
        'Do not forget to check Facebook Pages you manage—hackers often leave themselves as Page Admins.',
      ],
      commonRedFlags: [
        'Alerts from security@facebookmail.com saying a new email address was added or removed.',
        'Account suddenly disabled for violating community standards (often triggered when a hacker posts prohibited content).',
        'Unfamiliar credit card or PayPal charges labeled "FACEBK *ADS".',
      ],
      faqs: [
        {
          question: 'Why does facebook.com/hacked keep looping back to the hacker’s email?',
          answer: 'Try accessing facebook.com/hacked from a home Wi-Fi network and device you have used with Facebook for months, or choose "No longer have access to these?" on the password reset screen to upload an official photo ID.',
        },
        {
          question: 'What if the hacker got my Facebook account permanently disabled?',
          answer: 'Once you regain control of the login via facebook.com/hacked, Facebook typically displays an on-screen appeal prompt specifically designed for accounts disabled due to unauthorized access.',
        },
      ],
    },
  },
  {
    slug: 'zelle-venmo-scam',
    seoTitle: 'Sent Money to a Scammer on Zelle, Venmo, or Cash App?',
    metaDescription: 'Immediate steps to take if you sent money to a scammer via Zelle, Venmo, or Cash App, including bank fraud escalation and documentation.',
    heroHeadline: 'I sent money to a scammer on Zelle, Venmo, or Cash App',
    urgencyBadge: 'Payment scam response',
    estimatedFixTime: '5–10 min',
    intro: 'Instant payment transfers move fast, so contacting your bank and the payment app’s fraud department within the first hour gives you the best chance of halting or recalling a pending transfer.',
    riskBase: 64,
    icon: 'bank',
    questions: [
      { id: 'app', prompt: 'How was the money sent?', helper: 'Different payment rails have different dispute and recall rules.', choices: [{ value: 'zelle', label: 'Zelle (through my bank app)', riskDelta: 18 }, { value: 'p2p', label: 'Venmo, Cash App, or PayPal', riskDelta: 14 }, { value: 'wire', label: 'Bank wire or crypto transfer', riskDelta: 24 }] },
      deviceQuestion,
      { id: 'credentials', prompt: 'Did you also share your bank login, SSN, or a one-time code?', helper: 'Scammers often ask for login codes after convincing you to send money.', choices: [{ value: 'yes', label: 'Yes, I shared login or identity details', riskDelta: 24 }, { value: 'no', label: 'No, I only sent the payment', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 6 }] },
      { id: 'remote', prompt: 'Did the scammer have you install AnyDesk, TeamViewer, or a support app?', helper: 'Remote access lets scammers initiate additional transfers.', choices: [{ value: 'yes', label: 'Yes, I installed a remote-access app', riskDelta: 26 }, { value: 'no', label: 'No', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 5 }] },
    ],
    checklistSteps: [
      { id: 'p2p-call-bank', stepTitle: 'Call your bank’s Fraud Department immediately (use the number on your card)', whyItMatters: 'If the transfer is still processing—or if you were tricked by an impersonator claiming to be your bank—fast escalation is critical.', exactInstructions: 'Call the fraud number on the back of your debit/credit card right now. Clearly state that you were targeted by a fraud/impersonation scam, give the exact transaction timestamp and amount, and ask for a claim number.', severityWeight: 28 },
      { id: 'p2p-app-report', stepTitle: 'Report the recipient inside Zelle, Venmo, or Cash App', whyItMatters: 'Reporting flags the recipient’s account so the platform can freeze remaining funds before the scammer cashes out.', exactInstructions: 'Open the official payment app → tap the transaction → select "Report an issue" or contact official in-app support. Also report Zelle impostor scams directly through Zelle’s official scam reporting portal.', severityWeight: 20, externalUrl: 'https://www.zellepay.com/support/report-scam', externalLabel: 'Zelle Official Scam Reporting' },
      { id: 'p2p-remove-remote', stepTitle: 'Uninstall any remote-access app and disconnect Wi-Fi if one was installed', whyItMatters: 'If a scammer installed AnyDesk, ScreenConnect, or QuickSupport, they can still watch your screen or drain other accounts.', exactInstructions: 'Uninstall the remote-access app immediately, reboot your device, and change your online banking password from a separate clean device.', severityWeight: 24, showIf: { questionId: 'remote', anyOf: ['yes', 'unsure'] }, recommendedTool: securityTool },
      { id: 'p2p-lock-login', stepTitle: 'Reset online banking passwords and freeze credit if identity info was shared', whyItMatters: 'Prevents the scammer from logging into your bank directly or opening new credit lines.', exactInstructions: 'Change your bank and email passwords immediately. If you shared your SSN or driver’s license, place free credit freezes at Equifax, Experian, and TransUnion.', severityWeight: 22, showIf: { questionId: 'credentials', anyOf: ['yes', 'unsure'] }, recommendedTool: identityTool },
      { id: 'p2p-ftc-police', stepTitle: 'File an FTC report and local police report for your bank claim', whyItMatters: 'Banks frequently require an official FTC Identity Theft / Fraud report number or police report number to review disputes.', exactInstructions: 'Submit the incident details at ReportFraud.ftc.gov and save the confirmation number for your bank’s fraud investigator.', severityWeight: 10, externalUrl: 'https://reportfraud.ftc.gov/', externalLabel: 'ReportFraud.ftc.gov' },
    ],
    seoGuide: {
      whatHappensSummary: 'Peer-to-peer payment apps treat transfers like cash, which is why scammers impersonate banks, utilities, or Facebook Marketplace buyers to push victims into sending instant payments. Acting within minutes—and documenting impersonation—gives your bank the best chance to freeze the receiving account.',
      doNotDo: [
        'NEVER pay a "refund specialist" or "recovery hacker" who promises to claw back your Zelle or Venmo money—they will steal from you a second time.',
        'Do not send a second payment to "unlock" or "verify" a refund.',
        'Do not delete the text messages, call logs, or payment receipts—your bank’s fraud team needs screenshots as evidence.',
      ],
      commonRedFlags: [
        'Anyone claiming you must "send money to yourself" via Zelle to reverse a fraud charge.',
        'Buyers on Facebook Marketplace or Craigslist claiming you need to upgrade to a "Business Account" to receive their payment.',
        'Callers demanding payment via Zelle, Venmo, gift cards, or Bitcoin ATM to avoid arrest or utility shutoff.',
      ],
      faqs: [
        {
          question: 'Can my bank reverse a Zelle payment if I was scammed?',
          answer: 'While voluntary buyer-seller disputes are rarely reversed, major U.S. banks have updated policies to reimburse certain qualifying bank-impersonation Zelle scams. Escalate immediately to your bank’s Fraud Department and request a formal written review.',
        },
        {
          question: 'Should I unlink my bank account from Venmo or Cash App after a scam?',
          answer: 'If you shared your login credentials or allowed remote screen access, yes—call your bank to place a hold on ACH transfers or open a new checking account number so the scammer cannot initiate follow-up withdrawals.',
        },
      ],
    },
  },
  {
    slug: 'ssn-exposed-data-breach',
    seoTitle: 'Social Security Number Leaked in a Data Breach? What to Do',
    metaDescription: 'Free, practical steps to protect your credit and identity after your Social Security number (SSN) is exposed in a corporate data breach.',
    heroHeadline: 'My Social Security number was leaked in a data breach',
    urgencyBadge: 'Identity exposure protection',
    estimatedFixTime: '8–15 min',
    intro: 'A leaked Social Security number cannot be changed easily, so the smartest defense is locking down your credit files at all three bureaus so nobody can open loans or cards in your name.',
    riskBase: 48,
    icon: 'bank',
    questions: [
      { id: 'how', prompt: 'How did you find out your SSN was exposed?', helper: 'Knowing whether it was a company breach notice or active fraud helps prioritize steps.', choices: [{ value: 'notice', label: 'I received a data breach letter or dark-web alert', riskDelta: 12 }, { value: 'phished', label: 'I entered it on a scam website or gave it to a caller', riskDelta: 26 }, { value: 'fraud', label: 'I see an unfamiliar loan, credit inquiry, or tax issue', riskDelta: 32 }] },
      deviceQuestion,
      { id: 'frozen', prompt: 'Are your credit reports currently frozen at Equifax, Experian, and TransUnion?', helper: 'A credit freeze is free by federal law and blocks new credit checks.', choices: [{ value: 'no', label: 'No, they are not frozen', riskDelta: 18 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 12 }, { value: 'yes', label: 'Yes, all three are frozen', riskDelta: 0 }] },
      { id: 'irs', prompt: 'Have you set up an IRS Identity Protection PIN (IP PIN)?', helper: 'An IP PIN prevents scammers from filing a fake tax return using your SSN.', choices: [{ value: 'no', label: 'No', riskDelta: 8 }, { value: 'yes', label: 'Yes', riskDelta: 0 }, { value: 'unsure', label: 'I’m not sure', riskDelta: 4 }] },
    ],
    checklistSteps: [
      { id: 'ssn-freeze', stepTitle: 'Place a FREE credit freeze at Equifax, Experian, and TransUnion', whyItMatters: 'Even if a criminal has your SSN, name, and birthdate, a credit freeze stops lenders from opening new credit cards or loans in your name.', exactInstructions: 'Visit each bureau’s official freeze page directly (Equifax.com, Experian.com, TransUnion.com). Freezing and unfreezing your credit is 100% free by federal law—you do not have to buy a paid "credit lock" plan to freeze your file.', severityWeight: 28, showIf: { questionId: 'frozen', anyOf: ['no', 'unsure'] }, recommendedTool: identityTool },
      { id: 'ssn-reports', stepTitle: 'Pull your free official credit reports and check for unknown accounts', whyItMatters: 'Spotting unauthorized hard inquiries or new lines of credit early makes disputing them much easier.', exactInstructions: 'Go to AnnualCreditReport.com (the only federally authorized source for free weekly reports from all three bureaus) and review every open account and hard inquiry.', severityWeight: 18, externalUrl: 'https://www.annualcreditreport.com/', externalLabel: 'Open AnnualCreditReport.com' },
      { id: 'ssn-irs-pin', stepTitle: 'Get an IRS Identity Protection PIN (IP PIN) to block tax fraud', whyItMatters: 'Criminals use stolen SSNs to file early fraudulent tax returns and steal refunds.', exactInstructions: 'Sign into your official IRS.gov account and enroll in the Identity Protection PIN (IP PIN) program so no federal tax return can be filed with your SSN without your annual 6-digit PIN.', severityWeight: 16, showIf: { questionId: 'irs', anyOf: ['no', 'unsure'] }, externalUrl: 'https://www.irs.gov/identity-theft-fraud-scams/get-an-identity-protection-pin', externalLabel: 'IRS.gov Get an IP PIN' },
      { id: 'ssn-data-brokers', stepTitle: 'Remove your home address and phone from public data brokers', whyItMatters: 'Scammers combine leaked SSNs with public people-search profiles (Whitepages, Spokeo, BeenVerified) to pass security verification questions.', exactInstructions: 'Opt out of major people-search sites manually or use an automated data-removal service so your current address, relatives, and phone number are harder to cross-reference.', severityWeight: 12, recommendedTool: dataRemovalTool },
      { id: 'ssn-identitytheft-gov', stepTitle: 'Create a formal FTC recovery plan if active fraud already occurred', whyItMatters: 'IdentityTheft.gov generates official dispute letters and an Identity Theft Report required by creditors and bureaus.', exactInstructions: 'If you see unauthorized accounts or collection notices, go to IdentityTheft.gov to file a report and receive a personalized step-by-step dispute checklist.', severityWeight: 22, showIf: { questionId: 'how', anyOf: ['fraud', 'phished'] }, externalUrl: 'https://www.identitytheft.gov/', externalLabel: 'Open IdentityTheft.gov' },
    ],
    seoGuide: {
      whatHappensSummary: 'Because major corporate data breaches have exposed hundreds of millions of Social Security numbers, you should treat your SSN as semi-public information. Placing free security freezes at all three credit bureaus is the single strongest step you can take to neutralize a leaked SSN.',
      doNotDo: [
        'Do not pay for "Credit Lock" subscriptions when a federal "Credit Freeze" gives stronger legal protection for free.',
        'Do not forget to freeze all THREE bureaus (Equifax, Experian, and TransUnion)—freezing only one leaves two open.',
        'Do not ignore unfamiliar bank or utility bills arriving in the mail.',
      ],
      commonRedFlags: [
        'Hard credit inquiries on your report from banks or auto lenders you never applied to.',
        'IRS notices stating more than one tax return was filed using your SSN.',
        'Emails or letters thanking you for opening a new checking account or credit card you did not request.',
      ],
      faqs: [
        {
          question: 'Does freezing my credit hurt my credit score or stop me from using my existing cards?',
          answer: 'No. A credit freeze has zero impact on your credit score, and your existing credit cards, mortgage, and auto loans continue working normally. You simply lift the freeze temporarily for a few days whenever you apply for a new loan or credit card.',
        },
        {
          question: 'Should I also freeze ChexSystems?',
          answer: 'Yes—if you handed your SSN directly to a scammer, placing a free security freeze at ChexSystems.com prevents criminals from opening fraudulent checking or savings accounts in your name.',
        },
      ],
    },
  },
];

export function getTriageScenario(slug: string) {
  return triageScenarios.find((scenario) => scenario.slug === slug);
}
