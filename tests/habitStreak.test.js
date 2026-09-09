const { test } = require('node:test');
const assert = require('node:assert');
const inc = (s) => s + 1;
test('inc increments streak', () => {
  assert.strictEqual(inc(5), 6);
});
