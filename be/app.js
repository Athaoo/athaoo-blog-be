import Koa from 'koa'
import { koaBody } from 'koa-body'
import bodyParser from 'koa-bodyparser'
import adminRoutes from './src/routes/auth.js'
import articleRoutes from './src/routes/article.js'
import { myCors } from './src/middleware/my-cors.js'
import sequelize from './src/database/index.js'
import koaJwt from 'koa-jwt'
import { jwtSecret } from './src/controllers/admin.js'
import cors from 'koa2-cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  // 同步表
  await sequelize.sync()

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

          console.log(`🚀 -> main -> file:`, file)
          const reg = /\.[A-Za-z]+$/g
          const ext = file.originalFilename.match(reg)[0]

          const newName = file.originalFilename + Date.now() + ext
          file.filepath = join(__dirname, '/public/upload/' + newName)
          file.newFilename = newName
          console.log(`🚀 -> main -> Date.now():`, Date.now())
        },
        onError(err){
          console.log(err)
        }
      },
    })
  )

  app.use(cors())

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

  app.use(
    koaJwt({
      secret: jwtSecret,
    }).unless({
      path: [/^\/api\/login/, /^\/api\/register/, /.*public.*/, '/api/article/list'],
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
