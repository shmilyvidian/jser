module.exports = app => ({
    index: async ctx => {
        const name = await app.$service.user.getName();
        app.ctx.body = `ctrl user ${name}`; 
    },
    detial: async ctx => {
        ctx.body = 'detial首页'
    }
})