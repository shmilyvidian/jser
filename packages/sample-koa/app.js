const VKoa = require('./vkoa')
const app = new VKoa()
const delay = (time) => new Promise((resolve, reject) => setTimeout(() => resolve(), 2000))
app.use((ctx,next) => {
    if(ctx.request.url === '/favicon.ico'){
       return false
    }
    next()
})
app.use(async (ctx, next) => {
    console.log('================================')
    ctx.body = 'vidian1'
    console.log('1-0')
    await delay()
    await next()
    console.log('1-1')
})
app.use(async (ctx, next) => {
   ctx.body = 'vidian2'
    console.log('2-0')
    await next()
    console.log('2-1')
})
app.use(async (ctx, next) => {
   ctx.body = 'vidian3'
    console.log('3-0')
    await next()
    console.log('end');
})

app.listen(3001, () => {
    console.log('server is running 3001')
})