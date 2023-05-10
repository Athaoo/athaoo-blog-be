import { Model } from 'sequelize'
export type TestData = string

export type MySuccessRes = {
  message: string
}

export type loginSuccessRes = {
  message: string
  token: string
}

export type AddArticleType = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateArticleType = AddArticleType
export interface Article {
  id?: string
  title: string
  tags: string[]
  summary?: string
  content: string
  author?: string
  createdAt?: Date
  updatedAt?: Date
}
