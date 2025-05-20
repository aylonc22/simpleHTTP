const serveStaticFile = require('../static');
const { notFound } = require('../response');

module.exports = function staticFallback(req, res, next) {
  // Strip query string from path
  const path = req.path.split('?')[0];

  const staticRes = serveStaticFile(path);
  if (staticRes) {
    Object.assign(res, staticRes);
    return;
  }

  // If still not found, return 404
  Object.assign(res, notFound());
};
