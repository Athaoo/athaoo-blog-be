import Router from '@koa/router'
import { getAllAdmins } from '../controllers/admin.js'

const router = new Router()

router.get('/', getAllAdmins)
router.post('/login', async (ctx) => {
  //登录
})
router.post('/register', async (ctx) => {
  //注册
})

export default router
