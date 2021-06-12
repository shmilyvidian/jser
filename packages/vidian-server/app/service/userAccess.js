const { Service } = require('egg')

class UserService extends Service {
    async login(palyload){
        const {ctx, service} = this
        const user = await service.user.findByMobile(palyload.mobile)
        if(!user){
            ctx.throw(404, 'user not found')
        }
        let verify = await ctx.compare(palyload.password, user.password)
        if(!verify){
            ctx.throw(404, 'user password is error')
        }
        return {
            token: await service.accessToken.apply(user._id)
        }
    }

    async logout(ctx){

    }

    async current(){
        const {ctx, service} = this
        const _id = ctx.state.user.data._id
        const user = await service.user.find(_id)
        if(!user){
            ctx.throw(404, 'user not found')
        }
        user.password = ''
        return user
    }
}

module.exports = UserService