import Router from '@koa/router'
import { loginAdmin, registerAdmin } from '../controllers/admin.js'

const router = new Router()

router.post('/login', loginAdmin)
router.post('/register', registerAdmin)

export default router
