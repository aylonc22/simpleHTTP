const net = require('net');
const parseRequest = require('./src/parseRequest');
const routeRequest = require('./src/router');
const parseBody = require('./src/parseBody');
const { log, setVerbose } = require('./src/logger');

const args = process.argv.slice(2);
setVerbose(args.includes('-v'));

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    try {
      const raw = chunk.toString();
      const req = parseRequest(raw);
      req.parsedBody = parseBody(req.body, req.headers);
  
      log(`${req.method} ${req.path}`);
  
      const res = routeRequest(req);
  
      log(`${res.status} ${res.contentType}`);
  
      const STATUS_MESSAGES = {
        200: 'OK',
        302: 'Found',
        400: 'Bad Request',
        404: 'Not Found',
        500: 'Internal Server Error',
      };
  
      const statusMessage = STATUS_MESSAGES[res.status] || 'OK';
  
      const response =
        `HTTP/1.1 ${res.status} ${statusMessage}\r\n` +
        `Content-Type: ${res.contentType}\r\n` +
        `Content-Length: ${Buffer.byteLength(res.body)}\r\n` +
        (res.headers
          ? Object.entries(res.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n') + '\r\n'
          : '') +
        `\r\n` +
        res.body;
  
      socket.write(response);
      socket.end();
  
    } catch (err) {
      console.error('🔥 Server error:', err.message);
      const response =
        `HTTP/1.1 500 Internal Server Error\r\n` +
        `Content-Type: text/plain\r\n` +
        `Content-Length: 21\r\n` +
        `\r\n` +
        `Internal Server Error`;
  
      socket.write(response);
      socket.end();
    }
  });
  
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`🟢 SimpleHTTP running at http://localhost:${PORT}`);  
});
