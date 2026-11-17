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

  const lower = text.toLowerCase();
  const ruleMap = new Map(rulesData.rules.map((r) => [r.id, r]));

  const matchedRed: string[] = [];
  const matchedYellow: string[] = [];

  // Helper: word boundary match or phrase match
  const hasWord = (word: string) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i').test(lower);
  };

  const hasSubstring = (sub: string) => lower.includes(sub.toLowerCase());

  // R1: asks for OTP, PIN, CVV, MPIN, or card number
  // (otp, pin, cvv, mpin, card number, card details, password)
  const r1Keywords = ['otp', 'pin', 'cvv', 'mpin', 'password'];
  const r1Phrases = ['card number', 'card details'];
  const r1Match = r1Keywords.some((w) => hasWord(w)) || r1Phrases.some((p) => hasSubstring(p));
  if (r1Match) {
    matchedRed.push('R1');
  }

  // R2: threatens blocking, arrest, suspension or legal action together with an act-now word
  // (block, blocked, arrest, suspend, legal action) AND (now, today, immediately, urgent, within)
  const r2Threats = ['block', 'blocked', 'arrest', 'suspend', 'legal action'];
  const r2Urgency = ['now', 'today', 'immediately', 'urgent', 'within'];
  const r2ThreatMatch = r2Threats.some((t) => hasWord(t) || hasSubstring(t));
  const r2UrgencyMatch = r2Urgency.some((u) => hasWord(u) || hasSubstring(u));
  if (r2ThreatMatch && r2UrgencyMatch) {
    matchedRed.push('R2');
  }

  // R3: contains a link whose domain imitates a bank or government name, or uses a shortened address
  // (bit.ly, tinyurl, goo.gl, t.co, cutt.ly, rb.gy), or a domain with bank/gov keyword followed by unusual suffix (.xyz, .top, .click, .info, .online)
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

  // R4: asks you to install an app file (apk, install, download app) or to share screen (share screen, anydesk, teamviewer, quicksupport)
  const r4Phrases = ['apk', 'download app', 'share screen', 'anydesk', 'teamviewer', 'quicksupport'];
  const r4Words = ['install'];
  const r4Match = r4Phrases.some((p) => hasSubstring(p)) || r4Words.some((w) => hasWord(w));
  if (r4Match) {
    matchedRed.push('R4');
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

  // Yellow checks (only if no red rule matched)
  // Y1: urgency words (today, immediately, now, within 2 hours, last chance, expire)
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

  // Y3: any link (http, https, www, or a web address) from an unknown sender
  const hasLink = /https?:\/\/|www\.|\.com|\.in|\.org/i.test(lower);
  if (hasLink) {
    matchedYellow.push('Y3');
  }

  // Y4: asks you to call a phone number that is not on an official website (any 10-digit or +91 number in the message)
  const hasPhone = /(\+91[\s-]?)?[6-9]\d{9}\b|\b\d{10}\b/.test(lower);
  if (hasPhone) {
    matchedYellow.push('Y4');
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
