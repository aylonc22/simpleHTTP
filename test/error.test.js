const assert = require('assert');
const routeRequest = require('../src/router');
const parseBody = require('../src/parseBody');

// Helper
function mockReq(method, path, body = '', headers = {}) {
  return {
    method,
    path,
    headers,
    body,
    parsedBody: parseBody(body, headers)
  };
}

// Test: Invalid JSON
let res = routeRequest(mockReq('POST', '/submit', '{"name":Aylon}', {
  'content-type': 'application/json'
}));
assert.strictEqual(res.status, 400);
assert.ok(res.body.includes('Invalid') || res.body.includes('Bad Request'));

// Test: Missing required field "name"
res = routeRequest(mockReq('POST', '/submit', '{}', {
  'content-type': 'application/json'
}));
assert.strictEqual(res.status, 400);
assert.ok(res.body.includes('Missing') || res.body.includes('Bad Request'));

// Test: Unsupported path
res = routeRequest(mockReq('GET', '/not-found'));
assert.strictEqual(res.status, 404);
assert.ok(res.body.includes('404'));

// Test: Missing body
res = routeRequest(mockReq('POST', '/submit', '', {
  'content-type': 'application/json'
}));
assert.strictEqual(res.status, 400);
assert.ok(res.body.includes('Invalid') || res.body.includes('Bad Request'));

console.log('✅ error handling tests passed!');
