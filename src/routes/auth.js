import Router from '@koa/router'
import { loginAdmin, registerAdmin, updateAdmin } from '../controllers/admin.js'

const router = new Router({ prefix: '/api' })

router.post('/login', loginAdmin)
router.post('/register', registerAdmin)
router.put('/admin', updateAdmin)

export default router
