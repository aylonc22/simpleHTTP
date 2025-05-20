/**
 * CORS Middleware
 * ----------------
 * Enables cross-origin requests from any origin (*).
 * Handles OPTIONS preflight requests by returning 204 No Content.
 * Always adds CORS headers to the response.
 */
module.exports = function cors(req, res, next) {
    // Always add these headers
    res.headers['Access-Control-Allow-Origin'] = '*';
    res.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    res.headers['Access-Control-Allow-Headers'] = 'Content-Type';
  
    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.status = 204;
      res.body = '';
      return; // Do NOT call next()
    }
  
    next();
  };
  