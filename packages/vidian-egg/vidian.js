const Koa = require('koa')
const { initRouter, initController, initService, loadConfig } = require('./router-loader')

class Vidian {
    constructor(conf){
        this.$app = new Koa(conf)
        loadConfig(this)
        this.$ctrl = initController(this)
        this.$service = initService(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }
    start(port) {
        this.$app.listen(port, function(){
            console.log('server started');
        })
    }
}

module.exports = Vidian