const net = require('net');
const parseRequest = require('./src/parseRequest');
const routeRequest = require('./src/router');

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    const raw = chunk.toString();
    const req = parseRequest(raw);

    const res = routeRequest(req);

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
