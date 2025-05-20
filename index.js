const net = require('net');
const parseRequest = require('./src/parseRequest');
const { log, setVerbose } = require('./src/logger');
const runMiddleware = require('./src/middleware');

const logger = require('./src/middleware/logger');
const parseBodyMiddleware = require('./src/middleware/parseBody');
const routerMiddleware = require('./src/middleware/router');

const args = process.argv.slice(2);
setVerbose(args.includes('-v'));

const middlewareStack = [logger, parseBodyMiddleware, routerMiddleware];

const STATUS_MESSAGES = {
  200: 'OK',
  302: 'Found',
  400: 'Bad Request',
  404: 'Not Found',
  500: 'Internal Server Error',
};

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    try {
      const raw = chunk.toString();
      const req = parseRequest(raw);

      const res = {
        status: 404,
        contentType: 'text/plain',
        headers: {},
        body: 'Not Found'
      };

      runMiddleware(req, res, middlewareStack, () => {
        log(`${res.status} ${res.contentType}`);

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
      });

    } catch (err) {
      console.error('🔥 Server error:', err.message);
      const response =
        `HTTP/1.1 500 Internal Server Error\r\n` +
        `Content-Type: text/plain\r\n` +
        `Content-Length: 21\r\n\r\nInternal Server Error`;
      socket.write(response);
      socket.end();
    }
  });
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`🟢 SimpleHTTP running at http://localhost:${PORT}`);
});
