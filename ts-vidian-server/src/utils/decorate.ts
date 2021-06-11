import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions = {
    /**
    * 路路由⽂文件扩展名，默认值是`.{js,ts}` 
    * */
    extname?: string;
};
type RouteOptions = {
    /**
    * 适⽤用于某个请求⽐比较特殊，需要单独制定前缀的情形
    */
    prefix?: string;

    /**
    * 给当前路路由添加⼀一个或多个中间件 */
    middlewares?: Array<Koa.Middleware>;
};

const router = new KoaRouter();

const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
    return (target, property) => {

        process.nextTick(() => {


            const middles = []

            if (target.middlewares) {
                middles.push(...target.middlewares)
            }
            const url = options && options.prefix ? options.prefix + path : path;
            if (options.middlewares) {
                middles.push(...options.middlewares)
            }
            middles.push(target[property])
            router[method](url, ...middles)
        })
    }
}

export const middlewares = function middlewares(middlewares: Koa.Middleware[]) {
    return function (target) {
        target.prototype.middlewares = middlewares
    }
}

export const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router)
export const get = method('get')
export const post = method('post')
export const put = method('put')
export const del = method('del')
export const patch = method('patch')

export const loader = (folder: string, options: LoadOptions = {}): KoaRouter => {
    const extname = options.extname || '.{js,ts}'
    glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach(item => require(item));
    return router
}
