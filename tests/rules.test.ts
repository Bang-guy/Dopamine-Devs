import { describe, it, expect } from 'vitest';
import { checkMessage } from '../src/services/rules';

describe('Phase 4 & Polish Message Checker Engine (tests/rules.test.ts)', () => {
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

  it('Required check 1: Please give me 100 rupees or I will burn your toys gives Red', () => {
    const res = checkMessage('Please give me 100 rupees or I will burn your toys');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R2');
  });

  it('Required check 2: Your OTP is 4432. Do not share it with anyone. gives Green', () => {
    const res = checkMessage('Your OTP is 4432. Do not share it with anyone.');
    expect(res.verdict).toBe('green');
    expect(res.reasons).toEqual([]);
    expect(res.matchedRuleIds).toEqual([]);
  });

  it('R1 matches OTP, PIN, CVV, password requests', () => {
    const res = checkMessage('Please share your OTP to confirm.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R1');
  });

  it('A message demanding OTP is always Red, even if it has urgency words', () => {
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

  it('R7 matches fake bank warning with block and link', () => {
    const res = checkMessage('SBI alert: Your bank account will be blocked. Click link to update KYC.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R7');
  });

  it('R8 matches fake courier with fee demand', () => {
    const res = checkMessage('Your parcel is on hold at customs. Pay fee now to deliver.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R8');
  });

  it('R9 matches digital arrest police video call demand', () => {
    const res = checkMessage('CBI arrest warrant issued. Join video call immediately and do not disconnect.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R9');
  });

  it('R10 matches remote access screen share', () => {
    const res = checkMessage('Please install AnyDesk to allow access to your phone.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R10');
  });

  it('R11 matches prize or lottery requiring payment', () => {
    const res = checkMessage('You won a lottery prize of 50000 rupees. Pay 500 fee to claim.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R11');
  });

  it('R12 matches family emergency asking for money', () => {
    const res = checkMessage('Hello Dad, I am your son calling from new number. Urgent, please send money.');
    expect(res.verdict).toBe('red');
    expect(res.matchedRuleIds).toContain('R12');
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

  it('Y7 matches short deadline', () => {
    const res = checkMessage('Offer valid today only, last chance to register.');
    expect(res.verdict).toBe('yellow');
    expect(res.matchedRuleIds).toContain('Y7');
  });

  it('Y8 matches easy money job requiring deposit', () => {
    const res = checkMessage('Work from home part time and earn daily income. Initial deposit required.');
    expect(res.verdict).toBe('yellow');
    expect(res.matchedRuleIds).toContain('Y8');
  });

  it('Y9 matches investment promise', () => {
    const res = checkMessage('Join our trading tips group to double your money with guaranteed return.');
    expect(res.verdict).toBe('yellow');
    expect(res.matchedRuleIds).toContain('Y9');
  });

  it('Y10 matches request for ID or photo', () => {
    const res = checkMessage('Please send photo of card and selfie.');
    expect(res.verdict).toBe('yellow');
    expect(res.matchedRuleIds).toContain('Y10');
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
