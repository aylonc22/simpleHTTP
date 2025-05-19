// router.js

const routes = {
    'GET /': () => ({
      status: 200,
      contentType: 'text/plain',
      body: 'Welcome to SimpleHTTP!',
    }),
  
    'GET /about': () => ({
      status: 200,
      contentType: 'text/plain',
      body: 'This is the about page.',
    }),
  
    'POST /submit': () => ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Form received!' }),
    }),
  };
  
  function routeRequest(method, path) {
    const key = `${method} ${path}`;
    const handler = routes[key];
  
    if (!handler) {
      return {
        status: 404,
        contentType: 'text/plain',
        body: '404 Not Found',
      };
    }
  
    return handler();
  }
  
  module.exports = routeRequest;
  