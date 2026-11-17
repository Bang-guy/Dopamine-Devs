import { describe, it, expect } from 'vitest';
import { checkMessage } from '../src/services/rules';

describe('Phase 4 Message Checker Engine (tests/rules.test.ts)', () => {
  it('Empty input returns green and no reasons', () => {
    const res = checkMessage('');
    expect(res.verdict).toBe('green');
    expect(res.reasons).toEqual([]);
    expect(res.matchedRuleIds).toEqual([]);
  });

  it('Harmless message returns green and no reasons', () => {
    const res = checkMessage('Your bill is paid. Thank you.');
    expect(res.verdict).toBe('green');
    expect(res.reasons).toEqual([]);
    expect(res.matchedRuleIds).toEqual([]);
  });

  it('R1 matches OTP, PIN, CVV, password', () => {
    const res = checkMessage('Please share your OTP to confirm.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R1');
  });

  it('A message containing OTP is always Red, even if it has urgency words', () => {
    const res = checkMessage('Urgent: Your account will expire now. Send OTP immediately.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R1');
  });

  it('R2 matches threat plus act-now urgency', () => {
    const res = checkMessage('Your account will be blocked today unless you verify.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R2');
  });

  it('R3 matches shortened links (bit.ly)', () => {
    const res = checkMessage('Click here to review: bit.ly/my-bank-update');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R3');
  });

  it('R4 matches app install and screen sharing tools', () => {
    const res = checkMessage('Install QuickSupport app to help resolve your issue.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R4');
  });

  it('Y1 matches urgency words when no Red rule matches', () => {
    const res = checkMessage('Special offer ending today immediately.');
    expect(res.verdict).toBe('yellow');
    expect(res.matchedRuleIds).toContain('Y1');
  });

  it('Y2 matches prize / cashback claims', () => {
    const res = checkMessage('You received a cashback reward.');
    expect(res.verdict).toBe('yellow');
    expect(res.matchedRuleIds).toContain('Y2');
  });

  it('Y3 matches links from unexpected sources', () => {
    const res = checkMessage('Please check this website https://example.com for info.');
    expect(res.verdict).toBe('yellow');
    expect(res.matchedRuleIds).toContain('Y3');
  });

  it('Y4 matches an input with only a 10-digit number', () => {
    const res = checkMessage('Call our agent at 9876543210 for details.');
    expect(res.verdict).toBe('yellow');
    expect(res.matchedRuleIds).toContain('Y4');
  });

  it('Deterministic: identical inputs return identical output', () => {
    const input = 'Call 9876543210 immediately for cashback';
    const res1 = checkMessage(input);
    const res2 = checkMessage(input);
    expect(res1).toEqual(res2);
  });

  it('Localised reasons are provided for hi and mr', () => {
    const resHi = checkMessage('Send your pin', 'hi');
    expect(resHi.verdict).toBe('red');
    expect(resHi.reasons[0]).toContain('बैंक');

    const resMr = checkMessage('Send your pin', 'mr');
    expect(resMr.verdict).toBe('red');
    expect(resMr.reasons[0]).toContain('बँक');
  });
});
