const routeRequest = require('../router');

module.exports = function routerMiddleware(req, res, next) {
  const result = routeRequest(req);
  Object.assign(res, result);
  next();
};
