import Admin from '../models/admin.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const jwtSecret = '123'

export async function getAllAdmins(ctx) {
  const admins = await Admin.findAll()
  ctx.body = admins
}

export async function registerAdmin(ctx) {
  const { username, password } = ctx.request.body

  try {
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
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      message: 'Server error',
    }
  }
}

export async function loginAdmin(ctx) {
  const { username, password } = ctx.request.body

  try {
    const admin = await Admin.findOne({ where: { username } })
    if (!admin) {
      ctx.status = 401
      ctx.body = { message: 'User does not exist' }
      return
    }

    if (!username || !password) {
      ctx.status = 401
      ctx.body = { message: 'Invalid username or password' }
      return
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)
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
    }
  } catch (e) {
    console.log(e)
    ctx.status = 500
    ctx.body = {
      message: 'Server error',
    }
  }
}
