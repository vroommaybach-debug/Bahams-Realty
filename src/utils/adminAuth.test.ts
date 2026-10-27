import test from 'node:test';
import assert from 'node:assert/strict';
import {
  verifyAdminGatePassword,
  validateAdminPasswordChange,
  DEFAULT_ADMIN_GATE_SECRET,
} from './adminAuth';

test('verifyAdminGatePassword accepts exact default BahamsRealty@2026 password', () => {
  assert.equal(verifyAdminGatePassword('BahamsRealty@2026'), true);
  assert.equal(verifyAdminGatePassword('  BahamsRealty@2026  '), true);
});

test('verifyAdminGatePassword rejects wrong or empty passwords', () => {
  assert.equal(verifyAdminGatePassword(''), false);
  assert.equal(verifyAdminGatePassword('bahamsrealty@2026'), false);
  assert.equal(verifyAdminGatePassword('Admin123'), false);
});

test('verifyAdminGatePassword honors custom password when configured', () => {
  assert.equal(verifyAdminGatePassword('NewLagosKey#2027', 'NewLagosKey#2027'), true);
  assert.equal(verifyAdminGatePassword(DEFAULT_ADMIN_GATE_SECRET, 'NewLagosKey#2027'), false);
});

test('validateAdminPasswordChange validates current password, length, and confirmation match', () => {
  const wrongCurrent = validateAdminPasswordChange({
    currentInput: 'WrongPass',
    newPassword: 'BahamsNewPassword@2027',
    confirmPassword: 'BahamsNewPassword@2027',
  });
  assert.equal(wrongCurrent.valid, false);

  const tooShort = validateAdminPasswordChange({
    currentInput: 'BahamsRealty@2026',
    newPassword: '123',
    confirmPassword: '123',
  });
  assert.equal(tooShort.valid, false);

  const mismatch = validateAdminPasswordChange({
    currentInput: 'BahamsRealty@2026',
    newPassword: 'BahamsNewPassword@2027',
    confirmPassword: 'DifferentPassword@2027',
  });
  assert.equal(mismatch.valid, false);

  const validChange = validateAdminPasswordChange({
    currentInput: 'BahamsRealty@2026',
    newPassword: '  BahamsNewPassword@2027  ',
    confirmPassword: 'BahamsNewPassword@2027',
  });
  assert.equal(validChange.valid, true);
  assert.equal(validChange.sanitizedPassword, 'BahamsNewPassword@2027');
});
