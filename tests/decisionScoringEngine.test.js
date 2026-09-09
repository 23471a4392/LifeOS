const { test } = require('node:test');
const assert = require('node:assert');
const score = (w, s) => Math.round((s * w) / (w * 10) * 100);
test('score calculates 80%', () => {
  assert.strictEqual(score(5, 8), 80);
});
