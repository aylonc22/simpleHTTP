const types = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    svg: 'image/svg+xml',
    txt: 'text/plain',
  };
  
  function getMime(ext) {
    return types[ext.toLowerCase()] || 'application/octet-stream';
  }
  
  module.exports = getMime;
  