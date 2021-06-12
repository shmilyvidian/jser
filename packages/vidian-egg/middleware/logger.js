module.exports = async (ctx, next) => {
    console.log('middleware started');
    const start = new Date()
    await next()
    const duration = new Date() - start
    console.log(' 方法' + ctx.method + ' 路径' + ctx.path + '时长'+ duration);
}