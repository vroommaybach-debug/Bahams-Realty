import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { verifyAdminGatePassword } from './adminAuth.ts';

describe('verifyAdminGatePassword', () => {
  it('accepts the exact gate password', () => {
    assert.equal(verifyAdminGatePassword('BahamsRealty@2026'), true);
  });

  it('accepts the gate password with accidental leading or trailing whitespace', () => {
    assert.equal(verifyAdminGatePassword('  BahamsRealty@2026  '), true);
  });

  it('rejects wrong passwords and case mismatches', () => {
    assert.equal(verifyAdminGatePassword('bahamsrealty@2026'), false);
    assert.equal(verifyAdminGatePassword('BahamsRealty2026'), false);
    assert.equal(verifyAdminGatePassword('admin123'), false);
    assert.equal(verifyAdminGatePassword(''), false);
  });
});
