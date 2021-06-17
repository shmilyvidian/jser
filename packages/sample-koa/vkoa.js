const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class VKoa {
    constructor(){
        this.middlewares = []
    }
    componse (middlewares){
        return function(ctx){
            return dispatch(0)
            function dispatch(i){
                let fn = middlewares[i]
                if(!fn){
                    console.log(ctx,'ctx');
                    return Promise.resolve()
                }
                return Promise.resolve(
                    fn(ctx, function next(){
                        return dispatch(i+1)
                    })
                )
            }
        }
        
    }
    listen(...args){
        const server = http.createServer(async (req, res) => {
            const ctx = this.createContext(req, res)
            const fn = this.componse(this.middlewares)
            await fn(ctx)
            res.end(ctx.body)
        })
        server.listen(...args)
    }
    use(callback){
        this.middlewares.push(callback)
    }
    createContext(req, res){
        const ctx  = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = VKoa