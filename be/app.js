import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import adminRoutes from './src/routes/auth.js'
import testRoute from './src/routes/test.js'
import articleRoutes from './src/routes/article.js'
import { myCors } from './src/middleware/my-cors.js'
import sequelize from './src/database/index.js'

async function main() {
  // 同步表
  await sequelize.sync()

  const app = new Koa()
  app.use(myCors)
  app.use(bodyParser())
  app.use(adminRoutes.routes()).use(adminRoutes.allowedMethods())
  app.use(testRoute.routes())
  app.use(articleRoutes.routes()).use(adminRoutes.allowedMethods())

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

main()
