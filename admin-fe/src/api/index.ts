import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import {
  TestData,
  Article,
  AddArticleType,
  UpdateArticleType,
  MySuccessRes,
  loginSuccessRes,
} from './types'
import { useState } from 'react'
import { message } from 'antd'

const localUrl = '//localhost:3000/api'

const instance = axios.create({
  baseURL: localUrl,
  timeout: 5000,
})

// 在请求拦截器中，你可以规定 AxiosRequestConfig 类型
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`🚀 -> file: index.ts:41 -> url:`, config.url)
    if (config.url !== '/login' && config.url !== '/register') {
      // 在此处添加请求拦截逻辑，如添加请求头等
      const token = sessionStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 在响应拦截器中，你可以规定 AxiosResponse 类型
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 在此处添加响应拦截逻辑，如统一处理错误等
    return response
  },
  (error: AxiosError) => {
    console.log(`🚀 -> file: index.ts:35 -> error:`, error)
    if (error.response.status === 401) {
      // 处理身份验证错误，如重定向到登录页等
    }
    return Promise.reject(error)
  }
)

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

export const apiLogin = async (
  username: string,
  password: string
): Promise<AxiosResponse<loginSuccessRes>> => {
  return await instance.post<loginSuccessRes>('/login', {
    username,
    password,
  })
}

export const apiRegister = async (
  username: string,
  password: string
): Promise<AxiosResponse<MySuccessRes>> => {
  return await instance.post<MySuccessRes>('/register', {
    username,
    password,
  })
}

export const getTestArticleData1 = async (): Promise<AxiosResponse<Article>> => {
  return await instance.get<Article>('/article/test')
}

export const createArticle = async (
  article: AddArticleType
): Promise<AxiosResponse<MySuccessRes>> => {
  return await instance.post<MySuccessRes>('/article', article)
}

export const getAllArticles = async (): Promise<AxiosResponse<Article[]>> => {
  return await instance.get<Article[]>('/article')
}

export const getOneArticle = async (id: string): Promise<AxiosResponse<Article>> => {
  return await instance.get<Article>(`/article/${id}`, {
    params: {
      id,
    },
  })
}

export const updateOneArticle = async (
  id: string,
  data: UpdateArticleType
): Promise<AxiosResponse<MySuccessRes>> => {
  return await instance.put<MySuccessRes>(`/article/${id}`, data)
}

export const deleteOneArticle = async (id: string): Promise<AxiosResponse<MySuccessRes>> => {
  return await instance.delete<MySuccessRes>(`/article/${id}`, {
    params: {
      id,
    },
  })
}

export default instance
