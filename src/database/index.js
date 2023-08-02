import { Sequelize } from 'sequelize'
import config from './config.js'

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
})

export default sequelize
