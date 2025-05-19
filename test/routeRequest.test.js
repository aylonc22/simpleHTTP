const assert = require('assert');
const routeRequest = require('../src/router');

// Test valid GET /
let res = routeRequest('GET', '/');
assert.strictEqual(res.status, 200);
assert.strictEqual(res.contentType, 'text/plain');
assert.strictEqual(res.body, 'Welcome to SimpleHTTP!');

// Test valid GET /about
res = routeRequest('GET', '/about');
assert.strictEqual(res.status, 200);
assert.strictEqual(res.body, 'This is the about page.');

// Test valid POST /submit
res = routeRequest('POST', '/submit');
assert.strictEqual(res.status, 200);
assert.strictEqual(res.contentType, 'application/json');
assert.deepStrictEqual(JSON.parse(res.body), { message: 'Form received!' });

// Test unknown route
res = routeRequest('GET', '/not-found');
assert.strictEqual(res.status, 404);
assert.ok(res.body.includes('404'));

console.log('✅ routeRequest() passed all tests!');
