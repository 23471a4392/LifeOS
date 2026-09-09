const { test } = require('node:test');
const assert = require('node:assert');

const formatCurrency = (amt, sym = '₹') => `${sym}${Number(amt).toLocaleString('en-IN')}`;
test('formatCurrency formats Indian Rupee correctly', () => {
  assert.strictEqual(formatCurrency(50000), '₹50,000');
});
