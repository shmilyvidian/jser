import { loader } from './utils/decorate';
import { resolve } from 'path';
import * as Koa from "koa"
import * as bodify from "koa-body"
import * as timing from "koa-xtime"
import * as serve from "koa-static"
const app = new Koa()

import { Sequelize } from 'sequelize-typescript';
const database = new Sequelize({
    port: 3306,
    database: 'vidian', 
    username: 'root', 
    password: 'admin123', 
    dialect: 'mysql',
    modelPaths: [`${__dirname}/model`],
});
database.sync({ force: true })
app.use(serve(`${__dirname}/public`))

app.use(
    bodify({
        multipart: true,
        strict: false,
    })
)
const router = loader(resolve(__dirname, './routes'))
app.use(router.routes())
app.use((ctx: Koa.context) => {
    ctx.body = 'hello world'
})
app.listen(3000, () => {
    console.log('server is running');
})