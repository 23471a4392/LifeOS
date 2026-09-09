const { test } = require('node:test');
const assert = require('node:assert');

const isExpired = (expiresAt, now) => now > expiresAt;
test('isExpired detects past timestamp', () => {
  assert.strictEqual(isExpired(1000, 2000), true);
  assert.strictEqual(isExpired(3000, 2000), false);
});
