const assert = require('assert');
const SimpleHTTP = require('../src/app');
const parseBody = require('../src/parseBody');

// Helper to create mock request objects
function mockReq(method, path, body = '', headers = {}) {
  let parsedBody;
  try {
    parsedBody = parseBody(body, headers);
  } catch (e) {
    // simulate parsing failure in real use
    parsedBody = undefined;
  }
  return {
    method,
    path,
    headers,
    body,
    parsedBody
  };
}

// Create app and route for /submit
const app = new SimpleHTTP();

app.post('/submit', (req, res) => {
  if (!req.parsedBody || typeof req.parsedBody !== 'object') {
    res.status = 400;
    res.contentType = 'text/plain';
    res.body = 'Invalid body format';
    return;
  }

  const { name } = req.parsedBody;
  if (!name) {
    res.status = 400;
    res.contentType = 'text/plain';
    res.body = 'Missing "name" field';
    return;
  }

  res.status = 302;
  res.headers = { Location: '/form.html?success=1' };
  res.body = '';
});

// === Tests ===

// Invalid JSON
let req = mockReq('POST', '/submit', '{"name":Aylon}', {
  'content-type': 'application/json'
});
let res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 400);
assert.ok(res.body.includes('Invalid'));

// Missing name field
req = mockReq('POST', '/submit', '{}', {
  'content-type': 'application/json'
});
res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 400);
assert.ok(res.body.includes('Missing'));

// Unknown route
req = mockReq('GET', '/not-found');
res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 404);
assert.ok(res.body.includes('Not Found'));

// Empty body
req = mockReq('POST', '/submit', '', {
  'content-type': 'application/json'
});
res = { headers: {} };
app.handle(req, res);
assert.strictEqual(res.status, 400);
assert.ok(res.body.includes('Invalid'));

console.log('✅ error handling tests passed!');
