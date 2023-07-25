import { useState } from 'react'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { TestData, Article, ArticleListQueryType } from './types'
import { useRequest as useRequestA } from 'ahooks'
import type { Options, Plugin } from 'ahooks/lib/useRequest/src/types'

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
      console.error(`Error fetching data`, err)
    } finally {
      setLoading(false)
    }
  }

  return [loading, fetchData] as const
}

/**
 *  ahooks/useRequest的封装
 *  1.限定函数返回值类型必须为AxiosResponse
 *  2.始终手动请求, 需要手动调用runAsync
 *  3.其他参数相同
 * @param requestFunction
 * @param options
 * @param plugins
 * @returns
 */
export const useMyHttpRequest = <TData, TParams extends any[]>(
  requestFunction: RequestFunction<TData, TParams>,
  options?: Options<AxiosResponse<TData>, TParams>,
  plugins?: Plugin<AxiosResponse<TData>, TParams>[]
) => {
  return useRequestA(requestFunction, { ...options, manual: true }, plugins)
}

export const getAllArticles = async (
  query?: ArticleListQueryType
): Promise<AxiosResponse<Article[]>> => {
  const params = {} as any
  //query?.condition ? params.condition = JSON.stringify(query?.condition) : null
  params.condition = JSON.stringify({
    // tags: ['test'],
  })
  params.pageLimit = query?.pageLimit ?? null
  params.pageNum = typeof query?.pageNum == 'number' && query?.pageNum >= 0 ? query?.pageNum : null
  params.orderBy = query?.orderBy ?? null

  return await instance.get<Article[]>('/api/public/article', { params })
}

export const getOneArticle = (id: number): Promise<AxiosResponse<Article>> => {
  return instance.get<Article>(`/api/public/article/${id}`)
}

export default instance
