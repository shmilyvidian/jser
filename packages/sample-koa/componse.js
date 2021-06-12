module.exports = function (middlewares){
    return function(ctx){
        return dispatch(0)
        function dispatch(i){
            let fn = middlewares[i]
            if(!fn){
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