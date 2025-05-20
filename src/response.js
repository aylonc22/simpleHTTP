function createResponse({ status = 200, contentType = 'text/plain', body = '' }) {
    return {
      status,
      contentType,
      body,
    };
  }
  
  function text(body, status = 200) {
    return createResponse({ body, status, contentType: 'text/plain' });
  }
  
  function json(obj, status = 200) {
    return createResponse({
      body: JSON.stringify(obj),
      status,
      contentType: 'application/json',
    });
  }
  
  function notFound(message = '404 Not Found') {
    return text(message, 404);
  }
  
  module.exports = {
    createResponse,
    text,
    json,
    notFound,
  };
  