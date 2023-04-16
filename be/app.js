import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import adminRoutes from './routes/admin.js'

const app = new Koa()

app.use(bodyParser())

app.use(adminRoutes.routes())
app.use(adminRoutes.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
