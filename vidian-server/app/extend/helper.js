// extend/helper.js
const moment = require('moment') // 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')
// 处理理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功 ~' }) => {
    console.log(res);
    ctx.body = {
        code: 0, data: res, msg
    }
    ctx.status = 200
}