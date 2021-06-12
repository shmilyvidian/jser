const fs = require('fs');
const path = require('path');
const Router = require('koa-router')

function load(dir,cb){
    //获取绝对路径
    const url = path.resolve(__dirname, dir)
    //读取文件
    const files = fs.readdirSync(url)
    //遍历文件夹
    files.forEach(filename => {
        filename = filename.replace(/\.js/, '')
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}

function initRouter(app){
    const router = new Router()
    load('routes', (filename, routers) => {

        const prefix = filename === 'index' ? '' : `/${filename}`
        routers = typeof routers === 'function' ? routers(app) : routers

        Object.keys(routers).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(`映射地址${method}、${path}`);
            router[method](prefix + path, async ctx => {
                app.ctx = ctx
                await routers[key](app)
            })
        })
       
    })
    return router
}

function initController(app){
    const controllers = {}
    //读取
    load('controllers', (filename, controller) => {
        controllers[filename] = typeof controller === 'function' ? controller(app) : controller
    })
    return controllers
}
function initService(app){
    const services = {}
    //读取
    load('service', (filename, service) => {
        
        services[filename] = typeof service === 'function' ? service(app) : service
    })
    return services
}

function loadConfig(app){
    
    load('config', (filename, config) => {
        if(config['middleware']){
            config['middleware'].forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid)
                app.$app.use(require(midPath))

            })
        }
    })
}

module.exports = {
    initRouter,
    initController,
    initService,
    loadConfig
}