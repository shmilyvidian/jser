
// app/controller/user.js
const Controller = require('egg').Controller
/**
 * @Controller 用户管理理
*/
class UserController extends Controller {
    constructor(ctx) {
        super(ctx)
    }


    /**
     * @summary 创建用户
     * @description 创建用户，记录用户账户/密码/类型 
     * @router post /api/user
     * @request body createUserRequest *body
     * @response 200 baseResponse 创建成功
     */
    async create() {
        const { ctx } = this
        //校验参数
        ctx.validate( ctx.rule.createUserRequest )
        const palyload = ctx.request.body || {}
        const res = await this.service.user.create(palyload)
        ctx.helper.success({ctx,res})
    }
}
module.exports = UserController