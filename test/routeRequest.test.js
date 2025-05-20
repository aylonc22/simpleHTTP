const assert = require('assert');
const routeRequest = require('../src/router');

// Helper to create mock request objects
function mockReq(method, path, body = '', headers = {}) {
  return {
    method,
    path,
    headers,
    body
  };
}

// Test valid GET /
let res = routeRequest(mockReq('GET', '/'));
assert.strictEqual(res.status, 200);
assert.strictEqual(res.contentType, 'text/plain');
assert.strictEqual(res.body, 'Welcome to SimpleHTTP!');

// Test valid GET /about
res = routeRequest(mockReq('GET', '/about'));
assert.strictEqual(res.status, 200);
assert.strictEqual(res.body, 'This is the about page.');

// Test valid POST /submit
res = routeRequest(mockReq('POST', '/submit', '{"name":"Aylon"}', {
  'content-type': 'application/json',
}));
assert.strictEqual(res.status, 200);
assert.strictEqual(res.contentType, 'application/json');
assert.deepStrictEqual(JSON.parse(res.body), { message: 'Hello, Aylon!' });

// Test unknown route
res = routeRequest(mockReq('GET', '/not-found'));
assert.strictEqual(res.status, 404);
assert.ok(res.body.includes('404'));

console.log('✅ routeRequest() passed all tests!');
