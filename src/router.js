const { log } = require('./logger');
const { text, json, notFound, redirect } = require('./response');
const serveStaticFile = require('./static');

const routes = {
  'GET /': (req) => text('Welcome to SimpleHTTP!'),
  'GET /about': (req) => text('This is the about page.'),
  'POST /submit': (req) =>{
    if (!req.parsedBody || typeof req.parsedBody !== 'object') {
        return badRequest('Invalid body format');
      }
    
    const { name } = req.parsedBody;
    if (!name) return badRequest('Missing "name" field');
   
    const message = name ? `Hello, ${name}!` : 'Form received!';
    log(message);
    
    return redirect('/form.html?success=1');
  },
};

function routeRequest(req) {
  const key = `${req.method} ${req.path}`;
  const handler = routes[key];
  if(handler) return handler(req);

  // Strip query string before static lookup
  const pathOnly = req.path.split('?')[0];
  
  // Try serve static files from /public
  const statisRes = serveStaticFile(pathOnly);
  return statisRes || notFound();
}

module.exports = routeRequest;
