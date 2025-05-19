const assert = require('assert');
const parseRequest = require('../src/parseRequest');

const rawRequest = 
  `POST /submit HTTP/1.1\r\n` +
  `Host: localhost:3000\r\n` +
  `Content-Type: application/json\r\n` +
  `Content-Length: 17\r\n\r\n` +
  `{"name":"Aylon"}`;

const parsed = parseRequest(rawRequest);

assert.strictEqual(parsed.method, 'POST');
assert.strictEqual(parsed.path, '/submit');
assert.strictEqual(parsed.protocol, 'HTTP/1.1');
assert.strictEqual(parsed.headers['host'], 'localhost:3000');
assert.strictEqual(parsed.headers['content-type'], 'application/json');
assert.strictEqual(parsed.body, '{"name":"Aylon"}');

console.log('✅ parseRequest() passed all tests!');
