const assert = require('assert');
const rateLimitFactory = require('../src/middleware/rateLimit');

// Helper to simulate req/res/next
function mockCall(rateLimitMiddleware, ip = '1.2.3.4') {
  const req = {
    headers: { 'x-forwarded-for': ip }
  };
  const res = { headers: {} };
  let calledNext = false;

  rateLimitMiddleware(req, res, () => {
    calledNext = true;
  });

  return { req, res, calledNext };
}

console.log('🧪 Running rate limit tests...');

// Create rate limiter: max 2 requests per 1 second
const rateLimit = rateLimitFactory({ windowMs: 1000, max: 2 });

// Test: first request should pass
let result = mockCall(rateLimit);
assert.strictEqual(result.calledNext, true);

// Test: second request should pass
result = mockCall(rateLimit);
assert.strictEqual(result.calledNext, true);

// Test: third request should fail
result = mockCall(rateLimit);
assert.strictEqual(result.calledNext, false);
assert.strictEqual(result.res.status, 429);
assert.ok(result.res.body.includes('Too many requests'));

// Wait for 1.1s and test reset
setTimeout(() => {
  result = mockCall(rateLimit);
  assert.strictEqual(result.calledNext, true);
  console.log('✅ rateLimit middleware passed all tests!');
}, 1100);
