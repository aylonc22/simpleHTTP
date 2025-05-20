const { text, json, notFound } = require('./response');
const serveStaticFile = require('./static');

const routes = {
  'GET /': (req) => text('Welcome to SimpleHTTP!'),
  'GET /about': (req) => text('This is the about page.'),
  'POST /submit': (req) =>{
    const { name } = req.parsedBody || {};
    const message = name ? `Hello, ${name}!` : 'Form received!';
    return json({ message });
  },
};

function routeRequest(req) {
  const key = `${req.method} ${req.path}`;
  const handler = routes[key];
  if(handler) return handler(req);

  // Try serve static files from /public
  const statisRes = serveStaticFile(req.path);
  return statisRes || notFound();
}

module.exports = routeRequest;
