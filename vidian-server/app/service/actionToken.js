const { Service } = require('egg')

class ActionTokenService extends Service {
    async apply(_id) {
        const { ctx } = this
        return ctx.app.jwt.sign(
            { 
                data: { _id }, 
                exp: Math.floor(Date.now() / 1000 + (60 * 60 * 24 * 7)) 
            }, app.config.jwt.secret
        )
    }
}