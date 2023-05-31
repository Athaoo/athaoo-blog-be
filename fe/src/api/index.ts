import { useState } from 'react'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { TestData, Article } from './types'

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

export const getAllArticles = async (): Promise<AxiosResponse<Article[]>> => {
  return await instance.get<Article[]>('/api/public/article')
}

export const getOneArticle = async (id: number): Promise<AxiosResponse<Article>> => {
  return await instance.get<Article>(`/api/public/article/${id}`, {
    params: {
      id,
    },
  })
}

export default instance
