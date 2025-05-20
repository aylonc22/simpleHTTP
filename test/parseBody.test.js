const assert = require('assert');
const parseBody = require('../src/parseBody');

// Test: Valid JSON
let raw = '{"name":"Aylon"}';
let headers = { 'content-type': 'application/json' };
let result = parseBody(raw, headers);
assert.deepEqual(result, { name: 'Aylon' });

// Test: Invalid JSON
raw = '{"name":Aylon}'; // Invalid
result = parseBody(raw, headers);
assert.strictEqual(result, raw); // Should return raw

// Test: Valid form-encoded
raw = 'name=Aylon&email=ay%40x.com';
headers = { 'content-type': 'application/x-www-form-urlencoded' };
result = parseBody(raw, headers);
assert.deepEqual(result, {
  name: 'Aylon',
  email: 'ay@x.com',
});

// Test: Unknown content-type
raw = '<xml><name>Aylon</name></xml>';
headers = { 'content-type': 'application/xml' };
result = parseBody(raw, headers);
assert.strictEqual(result, raw);

// Test: No content-type header
raw = 'just some string';
headers = {};
result = parseBody(raw, headers);
assert.strictEqual(result, raw);

console.log('✅ parseBody() passed all tests!');
