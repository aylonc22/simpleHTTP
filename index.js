const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (chunk) => {
    const request = chunk.toString();
    console.log('📥 Incoming request:');
    console.log(request);

    // A minimal valid HTTP response
    const body = 'Hello from SimpleHTTP!';
    const response = 
      'HTTP/1.1 200 OK\r\n' +
      'Content-Type: text/plain\r\n' +
      `Content-Length: ${Buffer.byteLength(body)}\r\n` +
      '\r\n' +
      body;

    socket.write(response);
    socket.end(); // close connection after sending response
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🟢 SimpleHTTP running at http://localhost:${PORT}`);
});
