import Admin from '../models/admin.js'
import jwt from 'jsonwebtoken'

const jwtSecret = '123'

export async function getAllAdmins(ctx) {
  const admins = await Admin.findAll()
  ctx.body = admins
}

export async function registerAdmin(ctx) {
  const { username, password } = ctx.request.body
  const existingAdmin = await Admin.findOne({ where: { username } })

  if (existingAdmin) {
    ctx.throw(400, 'Admin allready exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newAdmin = await Admin.create({
    username,
    password: hashedPassword,
  })

  ctx.status = 201
  ctx.body = {
    message: 'Admin registered successfully',
    admin: {
      id: newAdmin.id,
      username: newAdmin.username,
    },
  }
}

export async function loginAdmin(ctx) {
  const { username, password } = ctx.request.body

  const admin = await Admin.findOne({ where: { username } })
  if (!admin) {
    ctx.status = 401
    ctx.body = { message: 'Invalid username or password' }
    return
  }

  const passwordMatch = await bcrypt.compare(password, admin)
  if (!passwordMatch) {
    ctx.status = 401
    ctx.body = { message: 'Invalid username or password' }
    return
  }

  const token = jwt.sign(
    {
      id: admin.id,
      username: admin.username,
    },
    jwtSecret,
    { expiresIn: '1h' }
  )

  ctx.body = {
    message: 'Admin logged in successfully!',
    token,
    admin: { id: admin.id, username: admin.username },
  }
}
