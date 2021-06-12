const { Service } = require('egg')

class UserService extends Service {
    async create(palyload){
        const {ctx} = this
        palyload.password = await this.ctx.genHash(palyload.password)
        return ctx.model.User.create(palyload)
    }
    async findByMobile(mobile) {
        return this.ctx.model.User.findOne({mobile: mobile})
    }
}

module.exports = UserService