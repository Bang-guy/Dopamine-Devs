import rulesData from '../data/rules.json';

export type Verdict = 'red' | 'yellow' | 'green';

export interface CheckResult {
  verdict: Verdict;
  reasons: string[];
  matchedRuleIds: string[];
}

export function checkMessage(text: string, lang: 'en' | 'hi' | 'mr' = 'en'): CheckResult {
  if (!text || !text.trim()) {
    return { verdict: 'green', reasons: [], matchedRuleIds: [] };
  }

  // Normalise spaces and lowercase
  const lower = text.toLowerCase().replace(/\s+/g, ' ').trim();
  const ruleMap = new Map(rulesData.rules.map((r) => [r.id, r]));

  const matchedRed: string[] = [];
  const matchedYellow: string[] = [];

  // Helper: word boundary match or phrase match
  const hasWord = (word: string) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, 'iu').test(lower);
  };

  const hasSubstring = (sub: string) => lower.includes(sub.toLowerCase());

  // R1: asks for OTP, PIN, CVV, MPIN, or card number
  // Legitimate bank notifications (e.g. "Your OTP is 4432. Do not share it with anyone.") do NOT ask for OTP
  const isLegitimateOtpNotification =
    (hasSubstring('do not share') ||
      hasSubstring('never share') ||
      hasSubstring("don't share") ||
      hasSubstring('साझा न करें') ||
      hasSubstring('शेअर करू नका')) &&
    !hasSubstring('share your otp') &&
    !hasSubstring('send otp') &&
    !hasSubstring('enter otp') &&
    !hasSubstring('provide otp') &&
    !hasSubstring('forward otp');

  const r1Keywords = ['otp', 'pin', 'cvv', 'mpin', 'password'];
  const r1Phrases = ['card number', 'card details'];
  const r1Match =
    !isLegitimateOtpNotification &&
    (r1Keywords.some((w) => hasWord(w)) || r1Phrases.some((p) => hasSubstring(p)));

  if (r1Match) {
    matchedRed.push('R1');
  }

  // R2: threatens blocking, arrest, suspension, harm or extortion with urgency or money demand
  const r2Threats = [
    'block', 'blocked', 'arrest', 'suspend', 'legal action',
    'burn', 'kill', 'harm', 'destroy', 'leak', 'blackmail',
    'police complaint', 'ब्लाक', 'अटक', 'धमकी'
  ];
  const r2UrgencyOrDemand = [
    'now', 'today', 'immediately', 'urgent', 'within',
    'rupees', 'rs', 'inr', '₹', 'money', 'pay', 'give me', 'transfer',
    'रुपये', 'पैसे', 'तातडीने', 'लगेच'
  ];
  const r2ThreatMatch = r2Threats.some((t) => hasWord(t) || hasSubstring(t));
  const r2UrgencyMatch = r2UrgencyOrDemand.some((u) => hasWord(u) || hasSubstring(u));
  if (r2ThreatMatch && r2UrgencyMatch) {
    matchedRed.push('R2');
  }

  // R3: contains a link whose domain imitates a bank or government name, or uses a shortened address
  const shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'cutt.ly', 'rb.gy'];
  const unusualTlds = ['.xyz', '.top', '.click', '.info', '.online'];
  const bankGovKeywords = ['bank', 'sbi', 'hdfc', 'icici', 'pnb', 'rbi', 'gov', 'income-tax', 'incometax'];

  const hasShortener = shorteners.some((s) => hasSubstring(s));
  const hasUnusualBankDomain = bankGovKeywords.some((k) =>
    unusualTlds.some((tld) => hasSubstring(k) && hasSubstring(tld))
  );
  if (hasShortener || hasUnusualBankDomain) {
    matchedRed.push('R3');
  }

  // R4: asks you to install an app file or to share screen
  const r4Phrases = ['apk', 'download app', 'share screen', 'anydesk', 'teamviewer', 'quicksupport'];
  const r4Words = ['install'];
  const r4Match = r4Phrases.some((p) => hasSubstring(p)) || r4Words.some((w) => hasWord(w));
  if (r4Match) {
    matchedRed.push('R4');
  }

  // R7: Fake bank or government account warning
  // bank/gov word AND block word AND link or update word
  const bankGovWords = [
    'bank', 'sbi', 'hdfc', 'icici', 'pnb', 'rbi', 'kyc', 'income tax', 'incometax',
    'aadhaar', 'aadhar', 'pan', 'electricity board', 'बिजली', 'विद्युत', 'बैंक', 'एसबीआई',
    'केवाईसी', 'आधार', 'पॅन', 'बँक'
  ];
  const blockWords = [
    'block', 'blocked', 'suspend', 'suspended', 'freeze', 'frozen', 'deactivate',
    'deactivated', 'expire', 'expired', 'ब्लॉक', 'बंद', 'गोठवला', 'निलंबित'
  ];
  const updateWords = [
    'link', 'update', 'click', 'visit', 'http', 'https', 'www', 'अपडेट', 'लिंक', 'क्लिक'
  ];
  const hasR7Bank = bankGovWords.some((w) => hasWord(w) || hasSubstring(w));
  const hasR7Block = blockWords.some((w) => hasWord(w) || hasSubstring(w));
  const hasR7Update = updateWords.some((w) => hasWord(w) || hasSubstring(w));
  if (hasR7Bank && hasR7Block && hasR7Update) {
    matchedRed.push('R7');
  }

  // R8: Fake courier or customs fee
  const courierWords = [
    'parcel', 'courier', 'customs', 'delivery', 'package', 'shipment',
    'पार्सल', 'कुरियर', 'कस्टम', 'डिलिव्हरी', 'डिलीवरी'
  ];
  const feeWords = [
    'fee', 'charge', 'charges', 'pay now', 'pay', 'payment', 'unpaid', 'tax',
    'शुल्क', 'भरा', 'पैसे भरा', 'भुगतान'
  ];
  const hasR8Courier = courierWords.some((w) => hasWord(w) || hasSubstring(w));
  const hasR8Fee = feeWords.some((w) => hasWord(w) || hasSubstring(w));
  if (hasR8Courier && hasR8Fee) {
    matchedRed.push('R8');
  }

  // R9: Digital arrest or fake police
  const authorityWords = [
    'police', 'cbi', 'ed', 'court', 'arrest', 'warrant', 'cyber cell',
    'trai', 'narcotics', 'पुलिस', 'सीबीआय', 'अटक', 'वारंट', 'कोर्ट', 'सायबर सेल'
  ];
  const coercionWords = [
    'video call', 'stay on the call', 'do not disconnect', 'stay online', 'skype call',
    'व्हिडिओ कॉल', 'कॉल कट करू नका', 'कॉल पर रहें'
  ];
  const hasR9Authority = authorityWords.some((w) => hasWord(w) || hasSubstring(w));
  const hasR9Coercion = coercionWords.some((w) => hasSubstring(w));
  if (hasR9Authority && hasR9Coercion) {
    matchedRed.push('R9');
  }

  // R10: Remote access
  const remotePhrases = [
    'anydesk', 'teamviewer', 'quicksupport', 'screen share', 'screenshare',
    'allow access', 'give access', 'remote access', 'एनीडेस्क', 'स्क्रीन शेअर'
  ];
  if (remotePhrases.some((p) => hasSubstring(p))) {
    matchedRed.push('R10');
  }

  // R11: Prize or lottery that needs payment
  const prizeWords = [
    'prize', 'lottery', 'lucky draw', 'won', 'winner', 'jackpot',
    'लॉटरी', 'लकी ड्रॉ', 'जिंकले', 'विजेता', 'बक्षीस'
  ];
  const payOrClaimWords = ['fee', 'pay', 'claim', 'deposit', 'charges', 'tax', 'शुल्क', 'भरा', 'भुगतान'];
  const moneyWords = ['rupees', 'rs', 'inr', '₹', 'पैसे', 'रुपये', 'money'];
  const hasR11Prize = prizeWords.some((w) => hasWord(w) || hasSubstring(w));
  const hasR11Pay = payOrClaimWords.some((w) => hasWord(w) || hasSubstring(w));
  const hasR11Money = moneyWords.some((w) => hasWord(w) || hasSubstring(w));
  if (hasR11Prize && hasR11Pay && hasR11Money) {
    matchedRed.push('R11');
  }

  // R12: Family emergency with money
  const familyWords = [
    'grandchild', 'grandson', 'granddaughter', 'son', 'daughter', 'nephew', 'niece',
    'new number', 'urgent', 'send money', 'please help',
    'पोता', 'पोती', 'बेटा', 'बेटी', 'नातू', 'नात', 'मुलगा', 'मुलगी', 'नवीन नंबर', 'मदत करा'
  ];
  const emergencyMoneyWords = [
    'money', 'cash', 'transfer', 'rupees', 'rs', 'inr', '₹', 'पैसे', 'रुपये', 'भेजो', 'पाठवा'
  ];
  const hasR12Family = familyWords.some((w) => hasWord(w) || hasSubstring(w));
  const hasR12Money = emergencyMoneyWords.some((w) => hasWord(w) || hasSubstring(w));
  if (hasR12Family && hasR12Money) {
    matchedRed.push('R12');
  }

  // If ANY Red rule matches, verdict is Red. Yellow rules are skipped.
  if (matchedRed.length > 0) {
    const reasons = matchedRed.map((id) => {
      const r = ruleMap.get(id);
      return r ? ((r.reasons as any)[lang] || r.reasons.en) : '';
    });
    return {
      verdict: 'red',
      reasons,
      matchedRuleIds: matchedRed,
    };
  }

  // ─── Yellow checks (only if no red rule matched) ───

  // Y1: urgency words
  const y1Words = ['now', 'today', 'immediately', 'expire'];
  const y1Phrases = ['within 2 hours', 'last chance'];
  const y1Match = y1Words.some((w) => hasWord(w)) || y1Phrases.some((p) => hasSubstring(p));
  if (y1Match) {
    matchedYellow.push('Y1');
  }

  // Y2: prize, cashback, lottery, refund or reward claim
  const y2Words = ['prize', 'cashback', 'lottery', 'refund', 'reward'];
  const y2Match = y2Words.some((w) => hasWord(w) || hasSubstring(w));
  if (y2Match) {
    matchedYellow.push('Y2');
  }

  // Y3: any link from an unknown sender
  const hasLink = /https?:\/\/|www\.|\.com\b|\.in\b|\.org\b/i.test(lower);
  if (hasLink) {
    matchedYellow.push('Y3');
  }

  // Y4: phone number
  const hasPhone = /(\+91[\s-]?)?[6-9]\d{9}\b|\b\d{10}\b/.test(lower);
  if (hasPhone) {
    matchedYellow.push('Y4');
  }

  // Y7: Short deadline, no sender name
  const y7Phrases = [
    'last chance', 'expires', 'within 24 hours', 'today only', 'expires today',
    'अंतिम मौका', 'शेवटची संधी', 'आजच'
  ];
  if (y7Phrases.some((p) => hasSubstring(p))) {
    matchedYellow.push('Y7');
  }

  // Y8: Easy-money job
  const jobWords = [
    'earn', 'part time', 'part-time', 'like videos', 'work from home', 'daily income',
    'पार्ट टाइम', 'घर बैठे कमाएं', 'रोज कमाई', 'घरबसल्या काम'
  ];
  const depositWords = [
    'deposit', 'invest', 'investment', 'registration fee', 'डिपॉझिट', 'गुंतवणूक'
  ];
  const hasY8Job = jobWords.some((w) => hasWord(w) || hasSubstring(w));
  const hasY8Deposit = depositWords.some((w) => hasWord(w) || hasSubstring(w));
  if (hasY8Job && hasY8Deposit) {
    matchedYellow.push('Y8');
  }

  // Y9: Investment promise
  const investmentPhrases = [
    'double your money', 'guaranteed return', 'crypto', 'trading tips', 'profit',
    'high return', '100% return', 'पैसे दुप्पट', 'हमी परतावा', 'नफा'
  ];
  if (investmentPhrases.some((p) => hasSubstring(p))) {
    matchedYellow.push('Y9');
  }

  // Y10: Request for photo or ID
  const photoIdPhrases = [
    'send your aadhaar', 'send photo of card', 'send pan', 'selfie',
    'photo of aadhaar', 'share aadhaar', 'आधार कार्ड फोटो', 'पॅन कार्ड पाठवा', 'सेल्फी'
  ];
  if (photoIdPhrases.some((p) => hasSubstring(p))) {
    matchedYellow.push('Y10');
  }

  if (matchedYellow.length > 0) {
    const reasons = matchedYellow.map((id) => {
      const r = ruleMap.get(id);
      return r ? ((r.reasons as any)[lang] || r.reasons.en) : '';
    });
    return {
      verdict: 'yellow',
      reasons,
      matchedRuleIds: matchedYellow,
    };
  }

  return {
    verdict: 'green',
    reasons: [],
    matchedRuleIds: [],
  };
}
