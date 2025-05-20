const { text, json, notFound } = require('./response');

const routes = {
  'GET /': (req) => text('Welcome to SimpleHTTP!'),
  'GET /about': (req) => text('This is the about page.'),
  'POST /submit': (req) =>{
    const parsed = req.body;
    // Example: echo name from body if JSON
    let message = 'Form recived!';
    try{
        const data = JSON.parse(parsed);
        if(data.name) message = `Hello, ${data.name}!`;
    }
    catch{
        message = 'Invalid JSON body';
    }
    return json({message});
  },
};

function routeRequest(req) {
  const key = `${req.method} ${req.path}`;
  const handler = routes[key];
  return handler ? handler(req) : notFound();
}

module.exports = routeRequest;
