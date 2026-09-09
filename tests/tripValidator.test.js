const { test } = require('node:test');
const assert = require('node:assert');
const isValidDateSeq = (s, e) => new Date(e) >= new Date(s);
test('isValidDateSeq permits ordered dates', () => {
  assert.strictEqual(isValidDateSeq('2026-10-01', '2026-10-05'), true);
});
