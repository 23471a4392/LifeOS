const { test } = require('node:test');
const assert = require('node:assert');
const sumExp = (arr) => arr.reduce((s, e) => s + e.amount, 0);
test('sumExp calculates total sum', () => {
  assert.strictEqual(sumExp([{ amount: 100 }, { amount: 200 }]), 300);
});
