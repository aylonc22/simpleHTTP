const { log } = require('../logger');

module.exports = function logger(req, res, next) {
  log(`📥 ${req.method} ${req.path}`);
  next();
};
