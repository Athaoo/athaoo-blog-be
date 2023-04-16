import Router from '@koa/router'
import { getAllAdmins } from '../controllers/admin.js'

const router = new Router({ prefix: '/admin' })

router.get('/', getAllAdmins)

export default router
