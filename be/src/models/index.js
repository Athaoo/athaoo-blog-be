import sequelize from '../database/index.js'
import Admin from './admin.js'

sequelize
  .sync()
  .then(() => {
    console.log('All models synced successfully.')
  })
  .catch((error) => {
    console.error('Failed to sync models:', error)
  })

export { Admin }
