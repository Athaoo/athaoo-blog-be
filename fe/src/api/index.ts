import { useState } from 'react'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { TestData, Article } from './types'

const localUrl = '//localhost:3000'

const instance = axios.create({
  baseURL: localUrl,
  timeout: 500,
})

type RequestFunction<T, P extends any[]> = (...params: P) => Promise<AxiosResponse<T>>

type QueryArticlesConditionType = {
  page: number
}

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

export const getAllArticles = async (): Promise<AxiosResponse<Article[]>> => {
  return await instance.get<Article[]>('/api/public/article')
}

export const getOneArticle = (id: number): Promise<AxiosResponse<Article>> => {
  return instance.get<Article>(`/api/public/article/${id}`)
}

export default instance
