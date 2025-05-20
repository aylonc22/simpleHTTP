function runMiddleware(req, res, middlewareList, finalHandler) {
    let index = -1;
  
    function next(err) {
      index++;
      if (err || index === middlewareList.length) {
        if (err) {
          res.status = 500;
          res.body = 'Internal Server Error';
          return;
        }
        return finalHandler(req, res);
      }
  
      const current = middlewareList[index];
      current(req, res, next);
    }
  
    next(); // start chain
  }
  
  module.exports = runMiddleware;
  