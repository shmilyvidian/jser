const app = new (require('koa'))()
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const path = require('path')
app.use(koaStatic(path.join(__dirname, 'public')))

app.use(koaBody({
    multipart:true, // 支持文件上传
    encoding:'gzip',
    formidable:{
      uploadDir: path.join(__dirname,'public/upload/'), // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
      onFileBegin:(name,file) => { // 文件上传前的设置
        
      },
    }
  }));
app.use((ctx, next) => {
    if ( ctx.url === '/' && ctx.method === 'GET' ) {
        // 当GET请求时候返回表单页面
        let html = `
          <h1>koa2 upload demo</h1>
          <form method="POST" action="/upload" enctype="multipart/form-data">
            <p>file upload</p>
            <span>picName:</span><input name="picName" type="text" /><br/>
            <input name="file" type="file" /><br/><br/>
            <button type="submit">submit</button>
          </form>
        `
        ctx.body = html
    }else if(ctx.url === '/upload' && ctx.method === 'POST'){
        const file = ctx.request.files.file
        const basename = path.basename(file.path)
        let template = `
          <image src=${`${ctx.origin}/upload/${basename}`} />
        `
        ctx.body = template
    }
})

app.listen(4000, function () {
    console.log('server is listening on 4000');
})
