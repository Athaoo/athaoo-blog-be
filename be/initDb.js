import { Admin } from './src/models/index.js'

async function initDb() {
  try {
    const admin = await Admin.create({
      username: 'athaoo',
      password: 'athaooblog123', // 在实际项目中，您应该将密码加密存储
    })
    console.log('Admin created:', admin.toJSON())
  } catch (error) {
    console.error('Failed to create admin:', error)
  }
}

initDb()
