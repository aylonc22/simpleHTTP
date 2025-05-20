const fs = require('fs');
const path = require('path');
const mime = require('./utils/mime'); // We'll create this helper next
const { createResponse } = require('./response');

const PUBLIC_DIR = path.join(__dirname, 'public');

function serveStaticFile(reqPath) {
  const filePath = path.join(PUBLIC_DIR, reqPath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    // Prevent path traversal attacks
    return null;
  }

  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).slice(1);
    const type = mime(ext);
    return createResponse({
      body: data,
      status: 200,
      contentType: type,
      headers:{
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (err) {
    return null; // File not found or error
  }
}

module.exports = serveStaticFile;
