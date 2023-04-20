import Router from '@koa/router'
import bcrypt from 'bcrypt'
import Admin from '../models/admin.js'
import { loginAdmin, registerAdmin } from '../controllers/admin.js'

const router = new Router()

router.post('/login', loginAdmin)
router.post('/register', registerAdmin)

export default router
