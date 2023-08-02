import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/index.js'

class Admin extends Model {}

Admin.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
  }
)

export default Admin
