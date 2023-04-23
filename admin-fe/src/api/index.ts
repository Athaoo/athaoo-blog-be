import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { TestData, Article } from './types'
import { useState } from 'react'

const localUrl = '//localhost:3000'

const instance = axios.create({
  baseURL: localUrl,
  timeout: 500,
})

// 在请求拦截器中，你可以规定 AxiosRequestConfig 类型
// instance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // 在此处添加请求拦截逻辑，如添加请求头等
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// 在响应拦截器中，你可以规定 AxiosResponse 类型
// instance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // 在此处添加响应拦截逻辑，如统一处理错误等
//     return response
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       // 处理身份验证错误，如重定向到登录页等
//     }
//     return Promise.reject(error)
//   }
// )

type RequestFunction<T> = () => Promise<T>

// useRequest Hook
export const useRequest = <T>(requestFunction: RequestFunction<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setData(null)
      setLoading(true)
      const response = await requestFunction()
      setData(response)
    } catch (err) {
      console.error(`Error fetching data`, err)
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, fetchData] as const
}

export const getTestData = async (): Promise<AxiosResponse<TestData>> => {
  return await instance.get<TestData>('/test/get1')
}
export const getTestCorsData = async (): Promise<AxiosResponse<TestData>> => {
  return await instance.get<TestData>('/test/getcors')
}
export const getTestArticleData1 = async (): Promise<AxiosResponse<Article>> => {
  return await instance.get<Article>('/article/test')
}
export const getTestArticleData2 = async (): Promise<AxiosResponse<Article>> => {
  return await instance.get<Article>('/article/1')
}

export const createArticle = async (article: Article): Promise<AxiosResponse<Article>> => {
  return await instance.post<Article>('/article', article)
}

export const getAllArticles = async (): Promise<AxiosResponse<Article[]>> => {
  return await instance.get<Article[]>('/article')
}

export const getOneArticle = async (id: number): Promise<AxiosResponse<Article>> => {
  return await instance.get<Article>(`/article`, {
    params: {
      id,
    },
  })
}

export default instance
