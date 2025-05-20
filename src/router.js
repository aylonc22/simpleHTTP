const { text, json, notFound } = require('./response');

const routes = {
  'GET /': () => text('Welcome to SimpleHTTP!'),
  'GET /about': () => text('This is the about page.'),
  'POST /submit': () => json({ message: 'Form received!' }),
};

function routeRequest(method, path) {
  const key = `${method} ${path}`;
  const handler = routes[key];
  return handler ? handler() : notFound();
}

module.exports = routeRequest;
