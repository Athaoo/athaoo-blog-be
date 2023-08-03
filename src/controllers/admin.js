import Admin from '../models/admin.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const jwtSecret = '123'

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

    const hashPassword = bcrypt.hashSync(password, 10)
    await Admin.create({
      username,
      password: hashPassword,
    })

    ctx.status = 201
    ctx.body = {
      message: 'Admin registered successfully',
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      message: e.message,
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

    const isOk = bcrypt.compareSync(password, admin.password)
    if (!isOk) {
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
      { expiresIn: '12h' }
    )

    ctx.body = {
      message: 'Admin logged in successfully!',
      token,
    }
  } catch (e) {
    console.log(e)
    ctx.status = 500
    ctx.body = {
      message: e?.message ?? e,
    }
  }
}

export async function updateAdmin(ctx) {
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

    const hash = bcrypt.hashSync(password, 10)

    await Admin.update(
      {
        username,
        password: hash,
      },
      {
        where: {
          username,
        },
      }
    )

    ctx.body = {
      message: 'Admin updated in successfully!',
    }
  } catch (e) {
    console.log(e)
    ctx.status = 500
    ctx.body = {
      message: e?.message ?? e,
    }
  }
}
