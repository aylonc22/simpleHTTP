function createResponse({ status = 200, contentType = 'text/plain', body = '', headers = {} }) {
    return {
      status,
      contentType,
      body,
      headers,
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
  
  function badRequest(message = '400 Bad Request') {
    return createResponse({
      status: 400,
      contentType: 'text/plain',
      body: message,
    });
  }

  function notFound(message = '404 Not Found') {
    return text(message, 404);
  }

  function redirect(location, status = 302) {
    return {
      status,
      contentType: 'text/plain',
      body: `Redirecting to ${location}`,
      headers: {
        Location: location,
      },
    };
  }
  
  
  module.exports = {
    createResponse,
    text,
    json,
    badRequest,
    notFound,
    redirect,
  };
  