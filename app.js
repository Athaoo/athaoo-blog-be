import Koa from 'koa'
import { koaBody } from 'koa-body'
import bodyParser from 'koa-bodyparser'
import adminRoutes from './src/routes/auth.js'
import articleRoutes from './src/routes/article.js'
import sequelize from './src/database/index.js'
import koaJwt from 'koa-jwt'
import { jwtSecret } from './src/controllers/admin.js'
import cors from 'koa2-cors'
import koaStatic from 'koa-static'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  // 同步表
  await sequelize.sync()

  // 环境变量
  const app = new Koa()

  app.use(
    koaBody({
      multipart: true, //启用多部份表单解析
      formidable: {
        uploadDir: __dirname + '/public/uploads',
        keepExtensions: true, // 保持文件扩展名
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => {
          // 获取后缀, 如: .js  .txt
          const reg = /\.[A-Za-z]+$/g
          const ext = file.originalFilename.match(reg)[0]
        },
        onError(err) {
          console.log(err)
        },
      },
    })
  )

  if (process.env.NODE_ENV == 'test') {
    /**
     * 本地启动服务的情况下才需要cors
     * 服务端无论dev还是prod都有nginx来反向代理
     */
    app.use(cors())
  }

  app.use((ctx, next) => {
    return next().catch((err) => {
      if (err.status == 401) {
        ctx.status = 401
        ctx.body = 'need authorization to access'
      } else {
        throw err
      }
    })
  })

  app.use(koaStatic('public'))

  app.use(
    koaJwt({
      secret: jwtSecret,
    }).unless({
      path: [/^\/api\/login/, /^\/api\/register/, /^\/api\/admin/, /.*public.*/, /.*public.*/, '/api/article/list'],
    })
  )

  app.use(adminRoutes.routes()).use(adminRoutes.allowedMethods())
  app.use(articleRoutes.routes()).use(adminRoutes.allowedMethods())

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()
