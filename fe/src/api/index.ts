import { useState } from 'react'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { TestData, Article, ArticleListQueryType } from './types'

const localUrl = '//localhost:3000'

const instance = axios.create({
  baseURL: localUrl,
  timeout: 500,
})

type RequestFunction<T, P extends any[]> = (...params: P) => Promise<AxiosResponse<T>>

// useRequest Hook
export const useRequest = <T, P extends any[]>(requestFunction: RequestFunction<T, P>) => {
  const [loading, setLoading] = useState(true)

  const fetchData = async (...params: P) => {
    try {
      setLoading(() => true)
      const response = await requestFunction(...params)
      console.log(`🚀 -> file: index.ts:53 -> fetchData -> response:`, response)
      return response.data
    } catch (err) {
      console.error(`Error fetching data`, err.respose.data.message)
    } finally {
      setLoading(false)
    }
  }

  return [loading, fetchData] as const
}

export const getAllArticles = async (
  params?: ArticleListQueryType
): Promise<AxiosResponse<Article[]>> => {
  params = params ?? ({} as ArticleListQueryType)
  params.condition = {
    tags: ['test'],
  }
  params.pageLimit = 10
  params.pageNum = 0

  return await instance.get<Article[]>('/api/public/article', { params })
}

export const getOneArticle = (id: number): Promise<AxiosResponse<Article>> => {
  return instance.get<Article>(`/api/public/article/${id}`)
}

export default instance
