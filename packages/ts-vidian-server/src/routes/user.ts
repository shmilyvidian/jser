import * as Koa from "koa"
import { get ,post, middlewares } from "../utils/decorate"
const users = [
    {name: 'lsf'}
]
 
import model from '../model/user';

@middlewares([
    async function guard(ctx: Koa.Context, next: () => Promise<any>) {
        if(ctx.header.token){
            await next()
        }else{
            throw new Error('please login')
        }
    }
])
export default class User {
    @get('/users')
    public async list(ctx: Koa.Context){
        const users = await model.findAll()
        ctx.body = { ok: 1, data: users}
    }

    @post('/users', {
        middlewares: [
            async function validation(ctx: Koa.Context, next:()=>Promise<any>) {
                const name = ctx.request.body.name
                if(!name){
                    throw new Error('name is required')
                }
                await next()
            }
        ]
    })
    public async add(ctx: Koa.Context){
        users.push(ctx.request.body)
        const res = await model.create(ctx.request.body)
        ctx.body = { ok: 1, data:res}
    }
}