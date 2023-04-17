import Admin from '../models/admin.js'

export async function getAllAdmins(ctx) {
  const admins = await Admin.findAll()
  ctx.body = admins
}
