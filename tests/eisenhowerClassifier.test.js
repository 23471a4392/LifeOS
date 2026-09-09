const { test } = require('node:test');
const assert = require('node:assert');
const classify = (u, i) => (u >= 7 && i >= 7) ? 'Q1' : 'Q2';
test('classify assigns Q1 for high u and i', () => {
  assert.strictEqual(classify(8, 8), 'Q1');
});
