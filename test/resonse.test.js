const assert = require('assert');
const { text, json, notFound } = require('../src/response');

let res = text('Hello');
assert.strictEqual(res.status, 200);
assert.strictEqual(res.contentType, 'text/plain');
assert.strictEqual(res.body, 'Hello');

res = json({ ok: true });
assert.strictEqual(res.status, 200);
assert.strictEqual(res.contentType, 'application/json');
assert.strictEqual(res.body, '{"ok":true}');

res = notFound();
assert.strictEqual(res.status, 404);
assert.ok(res.body.includes('404'));

console.log('✅ response.js passed all tests!');
