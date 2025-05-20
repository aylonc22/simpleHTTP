const net = require('net');
const parseRequest = require('./src/parseRequest');
const { log, setVerbose } = require('./src/logger');
const runMiddleware = require('./src/middleware');
const logger = require('./src/middleware/logger');
const SimpleHTTP = require('./src/app');
const parseBody = require('./src/middleware/parseBody');
const cors = require('./src/middleware/cors');
const staticFallBack = require('./src/middleware/staticFallBack');
const rateLimit = require('./src/middleware/rateLimit');

const args = process.argv.slice(2);
setVerbose(args.includes('-v'));

const app = new SimpleHTTP();
app.use(logger);
app.use(parseBody);
app.use(cors);
app.use(rateLimit({windowMs:60_000, max:5}));
app.use(staticFallBack);


// ✅ Register routes
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

      app.handle(req, res);

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
        `Content-Length: 21\r\n\r\nInternal Server Error`;
      socket.write(response);
      socket.end();
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🟢 SimpleHTTP running at http://localhost:${PORT}`);
});
