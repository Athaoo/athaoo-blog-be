import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { Article, AddArticleType, UpdateArticleType, MySuccessRes, loginSuccessRes } from '../types'
import { getAllArticles as getCommonAllArticles, getOneArticle as getCommonOneArticle } from '..'

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
    if (response.status === 401) {
      sessionStorage.removeItem('token')
      // navigate('/login')
    }
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

export const createArticle = async (
  article: AddArticleType
): Promise<AxiosResponse<MySuccessRes>> => {
  return await instance.post<MySuccessRes>('/article', article)
}

export const getAllArticles = getCommonAllArticles

export const getOneArticle = getCommonOneArticle

export const updateOneArticle = async (
  id: number,
  data: UpdateArticleType
): Promise<AxiosResponse<MySuccessRes>> => {
  const formData = new FormData()
  formData.append('title', data.title)
  console.log(`🚀 -> data:`, data)
  formData.append('tags', JSON.stringify(data.tags))
  formData.append('summary', data.summary || '')
  formData.append('content', data.content)
  formData.append('author', data.author || '')
  if (data.cover) {
    formData.append('cover', data.cover)
  }
  console.log(`🚀 -> formData:`, formData.get('cover'))

  return await instance.put<MySuccessRes>(`/article/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteOneArticle = async (id: number): Promise<AxiosResponse<MySuccessRes>> => {
  return await instance.delete<MySuccessRes>(`/article/${id}`, {
    params: {
      id,
    },
  })
}

export default instance
