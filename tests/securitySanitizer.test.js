const { test } = require('node:test');
const assert = require('node:assert');

const sanitize = (str) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
test('sanitize strips executable script tags', () => {
  assert.strictEqual(sanitize('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
});
