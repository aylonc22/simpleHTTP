const runMiddleware = require("./middleware");
const { notFound } = require("./response");


class SimpleHTTP{
    constructor(){
        this.stack = [];
        this.routes = new Map(); //Store method + path handlers
    }

    use(fn){
        this.stack.push(fn);
    }

    get(path, handler){
        this.routes.set(`GET ${path}`, handler);
    }

    post(path, handler){
        this.routes.set(`POST ${path}`, handler);
    }

    handle(req, res){
        const routeKey = `${req.method} ${req.path}`;
        const handler = this.routes.get(routeKey);

        if (handler) {
        this.stack.push((req, res, next) => {
            handler(req, res);
            next();
        });
        }else{
            this.stack.push((req, res, next) => {
                Object.assign(res, notFound());
                next();
              });
        }

    return runMiddleware(req, res, this.stack, () => {});
  }
}

module.exports = SimpleHTTP;