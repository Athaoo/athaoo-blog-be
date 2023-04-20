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

export default instance
