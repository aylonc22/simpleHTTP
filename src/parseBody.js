const querystring = require('querystring');

/**
 * Parses a request body based on Content-Type header.
 * Supports:
 * - application/json
 * - application/x-www-form-urlencoded
 */
function parseBody(raw, headers) {
  const contentType = headers['content-type'];

  if (!contentType) return raw;

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw; // fallback to raw string if parsing fails
    }
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    return querystring.parse(raw);
  }

  return raw;
}

module.exports = parseBody;
