const assert = require('assert');
const cors = require('../src/middleware/cors');

// Helper to simulate request/response middleware flow
function runMiddleware(middleware, reqOverrides = {}) {
  const req = Object.assign({ method: 'GET', headers: {}, path: '/' }, reqOverrides);
  const res = { headers: {} };
  let nextCalled = false;

  middleware(req, res, () => {
    nextCalled = true;
  });

  return { req, res, nextCalled };
}

// ✅ Test: normal GET request adds CORS headers and calls next
let { res, nextCalled } = runMiddleware(cors);
assert.strictEqual(res.headers['Access-Control-Allow-Origin'], '*');
assert.strictEqual(res.headers['Access-Control-Allow-Methods'], 'GET, POST, OPTIONS');
assert.strictEqual(res.headers['Access-Control-Allow-Headers'], 'Content-Type');
assert.strictEqual(nextCalled, true);

// ✅ Test: OPTIONS request returns 204 and skips next()
({ res, nextCalled } = runMiddleware(cors, { method: 'OPTIONS' }));
assert.strictEqual(res.status, 204);
assert.strictEqual(res.body, '');
assert.strictEqual(nextCalled, false);

console.log('✅ cors middleware passed all tests!');
