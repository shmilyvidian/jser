const SS = require('./ss')
const app = new SS()
const delay = () => new Promise((resolve, reject) => setTimeout(() => resolve(), 2000))

app.use(async (ctx, next) => {
    console.log('================================')
    ctx.body = 'vidian'
    console.log('1-0')
    await delay()
    await next()
    console.log('1-1')
})
app.use(async (ctx, next) => {
   ctx.body = 'vidian'
    console.log('2-0')
    await next()
    console.log('2-1')
})
app.use(async (ctx, next) => {
   ctx.body = 'vidian'
    console.log('3-0')
    // await next()
})


app.listen(3001, () => {
    console.log('server is running 3001')
})