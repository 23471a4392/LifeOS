const { test } = require('node:test');
const assert = require('node:assert');
const isDueSoon = (dueDay, currentDay) => (dueDay - currentDay) <= 3 && (dueDay - currentDay) >= 0;
test('isDueSoon identifies upcoming bill in 2 days', () => {
  assert.strictEqual(isDueSoon(15, 13), true);
});
