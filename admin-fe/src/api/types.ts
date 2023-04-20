import { Model } from 'sequelize'
export type TestData = string
export interface Article extends Model {
  id: string
  title: string
  tags: string[]
  summary: string
  content: string
  author: string
  createdAt: Date
  updatedAt: Date
}
