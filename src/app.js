const runMiddleware = require("./middleware");


class SimpleHTTP{
    constructor(){
        this.stack = [];
    }

    use(fn){
        this.stack.push(fn);
    }

    handle(req, res){
        return runMiddleware(req, res, this.stack, ()=>{})
    }
}

module.exports = SimpleHTTP;