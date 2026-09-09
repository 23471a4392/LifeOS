const { test } = require('node:test');
const assert = require('node:assert');

const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return { valid: false };
  return { valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) };
};

test('validateEmail accepts standard format', () => {
  assert.strictEqual(validateEmail('student@lifeos.dev').valid, true);
});
test('validateEmail rejects malformed emails', () => {
  assert.strictEqual(validateEmail('bademail').valid, false);
});
