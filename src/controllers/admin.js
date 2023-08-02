import Admin from '../models/admin.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'

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

    await new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, async (err, hash) => {
        if (err) reject(err)

        try {
          await Admin.create({
            username,
            password: hash,
          })
        } catch (e) {
          reject(e)
        }

        resolve()
      })
    }).catch((e) => {
      throw e
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

    await new Promise((resolve, reject) => {
      bcrypt.compare(password, admin.password, async (err, ifMatch) => {
        if (err) reject(err)

        if (!ifMatch) {
          ctx.status = 401
          ctx.body = { message: 'Invalid username or password' }
          reject()
        }
        resolve()
      })
    }).catch((e) => {
      throw e
    })

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
      message: e.message,
    }
  }
}
