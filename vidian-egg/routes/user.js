module.exports = {
    "get /": async app => {
        const name = await app.$service.user.getName()
        app.ctx.body = `用户名称： ${name}`
    },
    "get /info":  async app => {
        const age = await app.$service.user.getAge()
        app.ctx.body = `用户年龄： ${age}`
    },
}