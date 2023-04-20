import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/index.js'

class Article extends Model {}

Article.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Article',
    timestamps: true, //默认开启时间戳
  }
)

export default Article
