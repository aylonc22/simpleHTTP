/**
 * Rate Limiting Middleware
 * ------------------------
 * Limits requests per IP to prevent abuse.
 */

const store = new Map();

module.exports = function rateLimit({ windowMs = 15 * 60 * 1000, max = 100 } = {}) {
  return function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.ip || 'local';

    const now = Date.now();
    const entry = store.get(ip) || { count: 0, expires: now + windowMs };

    if (now > entry.expires) {
      // Reset count and window
      entry.count = 1;
      entry.expires = now + windowMs;
    } else {
      entry.count++;
    }

    store.set(ip, entry);

    if (entry.count > max) {
      res.status = 429;
      res.contentType = 'text/plain';
      res.body = 'Too many requests. Please try again later.';
      return;
    }

    next();
  };
};
