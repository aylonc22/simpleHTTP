const assert = require('assert');
const SimpleHTTP = require('../src/app');
const parseBody = require('../src/parseBody');

// Helper to create mock request objects
function mockReq(method, path, body = '', headers = {}) {
  return {
    method,
    path,
    headers,
    body,
    parsedBody: parseBody(body, headers)
  };
}

// Create app instance with routes
const app = new SimpleHTTP();

// Define routes like you would in server.js
app.get('/', (req, res) => {
  res.status = 200;
  res.contentType = 'text/plain';
  res.body = 'Welcome to SimpleHTTP!';
});

app.get('/about', (req, res) => {
  res.status = 200;
  res.contentType = 'text/plain';
  res.body = 'This is the about page.';
});

app.post('/submit', (req, res) => {
  const { name } = req.parsedBody || {};
  if (!name) {
    res.status = 400;
    res.contentType = 'text/plain';
    res.body = 'Missing name';
    return;
  }
  res.status = 302;
  res.headers = { Location: '/form.html?success=1' };
  res.body = '';
});

// Run tests

// Test valid GET /
let req = mockReq('GET', '/');
let res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 200);
assert.strictEqual(res.contentType, 'text/plain');
assert.strictEqual(res.body, 'Welcome to SimpleHTTP!');

// Test valid GET /about
req = mockReq('GET', '/about');
res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 200);
assert.strictEqual(res.body, 'This is the about page.');

// Test POST /submit (JSON)
req = mockReq('POST', '/submit', '{"name":"Aylon"}', {
  'content-type': 'application/json',
});
res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 302);
assert.strictEqual(res.headers['Location'], '/form.html?success=1');

// Test POST /submit (form)
req = mockReq('POST', '/submit', 'name=Aylon', {
  'content-type': 'application/x-www-form-urlencoded',
});
res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 302);
assert.strictEqual(res.headers['Location'], '/form.html?success=1');

// Test unknown route
req = mockReq('GET', '/not-found');
res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 404);
assert.ok(res.body.includes('Not Found'));

console.log('✅ app routing passed all tests!');
