/**
 * Parses a raw HTTP/1.1 request into method, path, headers, and body.
 *
 * Expected structure of an HTTP/1.1 request:
 *
 * <METHOD> <PATH> <VERSION>\r\n
 * Header-Name: Header-Value\r\n
 * ... (more headers)
 * \r\n
 * (optional body)
 *
 * Example:
 * POST /submit HTTP/1.1\r\n
 * Host: localhost:3000\r\n
 * Content-Type: application/json\r\n
 * Content-Length: 17\r\n
 * \r\n
 * {"name":"Aylon"}
 *
 * Notes:
 * - This parser assumes HTTP/1.1 standard format.
 * - It does NOT currently handle:
 *   - chunked transfer encoding
 *   - malformed requests
 *   - multiline headers
 */
function parseRequest(raw) {
    const [headerPart, body = ''] = raw.split('\r\n\r\n');
    const lines = headerPart.split('\r\n');
    const [method, path, protocol] = lines[0].split(' ');
  
    const headers = {};
    for (let i = 1; i < lines.length; i++) {
      const [key, value] = lines[i].split(': ');
      headers[key.toLowerCase()] = value;
    }
  
    return {
      method,
      path,
      protocol,
      headers,
      body
    };
  }
  
  module.exports = parseRequest;
  