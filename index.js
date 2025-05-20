const net = require('net');
const parseRequest = require('./src/parseRequest');
const routeRequest = require('./src/router');
const parseBody = require('./src/parseBody');

const args = process.argv.slice(2);
const VERBOSE = args.includes('-v');

function log(...messages) {
  if (VERBOSE) console.log(...messages);
}

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    const raw = chunk.toString();
    const req = parseRequest(raw);
    req.parsedBody = parseBody(req.body, req.headers);

    log(`${req.method} ${req.path}`);

    const res = routeRequest(req);

    log(`${res.status} ${res.contentType}`);

    const response = 
      `HTTP/1.1 ${res.status} OK\r\n` +
      `Content-Type: ${res.contentType}\r\n` +
      `Content-Length: ${Buffer.byteLength(res.body)}\r\n` +
      `\r\n` +
      res.body;

    socket.write(response);
    socket.end();
  });
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`🟢 SimpleHTTP running at http://localhost:${PORT}`);  
});
