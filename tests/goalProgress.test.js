const { test } = require('node:test');
const assert = require('node:assert');
const calcProg = (m) => m.length > 0 ? Math.round((m.filter(x => x.completed).length / m.length) * 100) : 0;
test('calcProg computes 50%', () => {
  assert.strictEqual(calcProg([{ completed: true }, { completed: false }]), 50);
});
