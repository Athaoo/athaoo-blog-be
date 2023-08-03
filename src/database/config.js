import { config } from 'dotenv-flow'

// 读取环境变量
config({ debug: true })

const dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
}

export default dbConfig
