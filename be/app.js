import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import adminRoutes from './src/routes/admin.js'
import sequelize from './src/database/index.js'

const app = new Koa() // app.use(bodyParser())
// app.use(adminRoutes.routes())
// app.use(adminRoutes.allowedMethods())

// 测试数据库连接
;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
