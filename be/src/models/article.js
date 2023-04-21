import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/index.js'

class Article extends Model {}

Article.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        // 将JSON字符串转换为数组
        return JSON.parse(this.getDataValue('tags'))
      },
      set(value) {
        // 将数组转换为JSON字符串
        this.setDataValue('tags', JSON.stringify(value))
      },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Article',
    timestamps: true, //默认开启时间戳
  }
)

export default Article
