const { test } = require('node:test');
const assert = require('node:assert');
const calcScore = (rate) => Math.min(100, Math.round(rate * 1.5 + 40));
test('calcScore caps at 100', () => {
  assert.strictEqual(calcScore(50), 100);
});
