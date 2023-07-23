export type TestData = string

export type MySuccessRes = {
  message: string
}

export type loginSuccessRes = {
  message: string
  token: string
}

/**---------------------------------article------------------------------------------- */
export type AddArticleType = Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'cover'> & {
  cover?: File
}
export type UpdateArticleType = Omit<AddArticleType, 'cover'> & {
  cover?: File
}
export interface Article {
  id?: string
  title: string
  tags: string[]
  summary?: string
  content: string
  author?: string
  createdAt?: Date
  updatedAt?: Date
  cover?: string
}
