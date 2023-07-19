export type TestData = string

export type PageQueryType = {
  pageLimit: number
  pageNum: number
}

export type SearchListQueryType<T extends object> = Partial<PageQueryType> & {
  condition: T
}

export type MySuccessRes = {
  message: string
}

export type loginSuccessRes = {
  message: string
  token: string
}

/**---------------------------------article------------------------------------------- */
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
export type AddArticleType = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateArticleType = Omit<AddArticleType, 'cover'> & {
  cover?: File
}

export type ArticleListQueryType = SearchListQueryType<Partial<Pick<Article, 'tags'>>>
