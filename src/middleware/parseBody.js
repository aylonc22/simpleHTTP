const parseBody = require("../parseBody")


module.exports = function parseBodyMiddleware(req, res, next){
    req.parsedBody = parseBody(req.body, req.headers);
    next();
}