export type TestData = string

export type PageQueryType<OK extends object> = {
  pageLimit: number
  pageNum: number
  orderBy: keyof OK
  isDesc: boolean
}

export type SearchConditionType<T extends object> = Partial<{
  [K in keyof T]?: any
}>

export type SearchListQueryType<TCondition extends object, TOrder extends object> = Partial<
  PageQueryType<TOrder>
> & {
  condition?: SearchConditionType<TCondition>
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
  id?: number
  title: string
  tags: string[]
  summary?: string
  content: string
  author?: string
  createdAt?: Date
  updatedAt?: Date
  cover?: string
}
export type AddArticleType = Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'cover' | 'tags'> & {
  cover?: File
  tags: string
}

export type UpdateArticleType = AddArticleType

export type ArticleConditionsType = Partial<Pick<Article, 'tags'>>
export type ArticleOrderType = Pick<Article, 'createdAt' | 'id'>

export type ArticleListQueryType = SearchListQueryType<ArticleConditionsType, ArticleOrderType>
