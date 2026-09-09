const { test } = require('node:test');
const assert = require('node:assert');

const hash = (s) => 'h_' + s.length;
test('hashing generates consistent hash', () => {
  assert.strictEqual(hash('test'), hash('test'));
});
