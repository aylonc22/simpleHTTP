const assert = require('assert');
const fs = require('fs');
const path = require('path');
const serveStaticFile = require('../src/static');

const publicDir = path.join(__dirname, '../src/public');
const testFileName = 'test.txt';
const testFilePath = path.join(publicDir, testFileName);
const testContent = 'Hello Static World!';

// ✅ Create test file before running tests
fs.writeFileSync(testFilePath, testContent);

// ✅ Test: Serves existing file
const res = serveStaticFile(`/${testFileName}`);
assert(res, 'Expected a response object');
assert.strictEqual(res.status, 200);
assert.strictEqual(res.contentType, 'text/plain');
assert.strictEqual(res.body.toString(), testContent);
assert.ok(res.headers['Cache-Control'], 'Should have Cache-Control header');

// ✅ Test: Missing file
const notFound = serveStaticFile('/no-such-file.txt');
assert.strictEqual(notFound, null);

// ✅ Test: Path traversal
const traversal = serveStaticFile('/../server.js');
assert.strictEqual(traversal, null);

// ✅ Cleanup: Remove the test file
fs.unlinkSync(testFilePath);

console.log('✅ serveStaticFile() passed all tests!');
