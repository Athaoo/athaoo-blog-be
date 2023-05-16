import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import adminRoutes from './src/routes/auth.js'
import articleRoutes from './src/routes/article.js'
import { myCors } from './src/middleware/my-cors.js'
import sequelize from './src/database/index.js'
import koaJwt from 'koa-jwt'
import { jwtSecret } from './src/controllers/admin.js'
import cors from 'koa2-cors'

async function main() {
  // 同步表
  await sequelize.sync()

  const app = new Koa()

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
  app.use(cors())
  app.use(
    koaJwt({
      secret: jwtSecret,
    }).unless({
      path: [/^\/api\/login/, /^\/api\/register/],
    })
  )
  app.use(bodyParser())
  app.use(adminRoutes.routes()).use(adminRoutes.allowedMethods())
  app.use(articleRoutes.routes()).use(adminRoutes.allowedMethods())

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()
