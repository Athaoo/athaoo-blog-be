import React, { useEffect, createContext, useContext, useState } from 'react'
import { Card, Col, Menu, MenuProps, Row, theme, Divider, Input, Button } from 'antd'
import { ReactChildrenProps } from '@src/types/types'
import axios from 'axios'

/** task id的工厂*/
class TId {
  /**
   * 创建任务ID
   * @param {string} preffix 前缀
   * @param {number} splitCutIdx 切片索引
   * @returns {string} 任务ID
   */
  static createTaskId = (preffix, splitCutIdx) => `${preffix}-${splitCutIdx}`
}

/**
 * 并发任务队列控制模块
 * 与下载模块并不耦合
 */
class AsyncQueue {
  concurrency = 6 // 并发请求数量
  queue = [] // 请求队列
  /**
   * @type {Map<taskId:string, { resolve: Function, reject: Function }>}
   */
  activeTasks = new Map() // 当前活动的任务映射表

  constructor(concurrency = 6) {
    this.concurrency = concurrency
  }

  /**
   * 添加任务到队列
   * @param {() => Promise} task
   * @param {any} id
   * @param {Function} cancelCb
   * @returns
   */
  add(task, id, cancelCb = () => {}) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, id, resolve, reject, cancelCb })
      this.run()
    })
  }

  /**
   * 取消指定任务
   * @param {Set|Array} ids
   */
  cancel(ids) {
    if (!ids) return
    if (ids instanceof Array) ids = new Set(ids)

    for (const [taskId, { reject, cancelCb }] of this.activeTasks.entries()) {
      if (ids.has(taskId.description)) {
        cancelCb && cancelCb instanceof Function && cancelCb()

        this.activeTasks.delete(taskId)
        reject(new Error('Task canceled'))
      }
    }

    // 取消队列中等待执行的任务
    this.queue = this.queue.filter((task) => !ids.has(task.id))
  }

  // 执行队列中的任务
  async run() {
    while (this.activeTasks.size < this.concurrency && this.queue.length > 0) {
      const { task, id, resolve, reject } = this.queue.shift()
      const taskId = Symbol(id)

      this.activeTasks.set(taskId, { resolve, reject })

      try {
        const res = await task()
        this.activeTasks.delete(taskId)
        resolve(res)
      } catch (error) {
        this.activeTasks.delete(taskId)
        reject(error)
      } finally {
        this.run() // 继续执行队列中的任务
      }
    }
  }

  // 清空队列
  clearQueue() {
    this.queue = []
  }
}

const queue = new AsyncQueue(6)

/**
 * 下载业务说明:
 *
 * 下载任务的划分粒度为
 * 预下载缓存 (主线程中loader的handleFrameMove)
 * 	->并发下载多帧 (主线程并发调用worker线程的下载)
 * 		->每一帧中并发下载图片/点云 (downloader.img/pcd.download)
 * 			->切片下载，每一个切片都作为一个独立的axios请求(splitDownload)
 *
 * 注意，asyncQueue是与下载业务不耦合的队列模块,这里的请求模块只是采用了异步队列以管理promise
 *
 * taskId: 最小粒度的切片任务的id，由前缀preffix+切片索引组成 例如: pcd-80-3,代表第81帧的点云的第4个切片
 * taskIdPreffix: 图片为img-frameIdx+sort, 点云为pcd-frameIdx
 *
 */

/**
 * 用于记录一次下载任务分片推入队列的taskIds，用于cancel队列中的任务
 * @type {Map<string, taskIds: string[]>}
 */
const taskIdsMap = new Map()

/**
 * 用于记录一次下载任务中共用的AbortController实例，用于abort
 * @type {Map<string, abortControll: AbortController>}
 */
const abortControllerMap = new Map()

/**
 * 请求二进制
 * @param {string} url 请求的URL
 * @param {object} headers 请求头
 * @param {object} params 请求参数
 * @returns {Promise} Promise对象，包含响应的数据
 */
async function getHeadInfo(url, headers, params = {}) {
  try {
    params = new URLSearchParams(params)
    return await axios.head(url, { headers, params })
  } catch (error) {
    throw new Error(`Failed to get content length: ${error.message}`)
  }
}

/**
 * 发起二进制请求
 * @param {string} url 请求的URL
 * @param {object} headers 请求头
 * @param {object} params 请求参数
 * @param {AbortSignal} signal 取消信号
 * @returns {Promise} Promise对象，包含响应的数据
 */
async function reqBinary(url, headers = {}, params = {}, signal) {
  params = new URLSearchParams(params)
  try {
    return axios
      .get(url, {
        responseType: 'arraybuffer',
        headers,
        params,
        signal,
      })
      .then((res) => ({ buffer: res.data }))
      .catch((error) => {
        throw new Error(`Failed to download or abort: ${error.message}`)
      })
  } catch (e) {
    throw new Error(e.message)
  }
}

/**
 * 将请求添加到队列中进行下载
 * @param {string} url 请求的URL
 * @param {object} headers 请求头
 * @param {object} params 请求参数
 * @param {AbortSignal} signal 取消信号
 * @param {string} queueTaskId 队列任务ID
 * @param {Function} cancelCb 取消回调函数
 * @returns {Promise} Promise对象，包含响应的数据
 */
function queueDownload(url, headers = {}, params = {}, signal, queueTaskId, cancelCb = () => {}) {
  return queue.add(() => reqBinary(url, headers, params, signal), queueTaskId, cancelCb)
}

/**
 * 取消队列中的任务
 * @param {string} queueTaskId 队列任务ID
 */
async function queueCancel(queueTaskId) {
  queue.cancel([queueTaskId])
}

/**
 * 切片请求二进制数据
 * @param {string} url 请求的URL
 * @param {object} headers 请求头
 * @param {object} params 请求参数
 * @param {AbortSignal} signal 取消信号
 * @param {string} taskIdPreffix 每一个切片请求存入queue中的taskId的前缀,同时也是存放着一控制整个分片任务的AbortControll在map中的key
 * @param {number} limit 切片大小限制
 * @returns {Promise} Promise对象，包含合并后的切片数据
 */
async function splitReqBinary(
  url,
  headers = {},
  params = {},
  signal,
  taskIdPreffix = '',
  limit = 1024000
) {
  try {
    const { headers: resHeader } = await getHeadInfo(url, headers, params)
    const contentLength = parseInt(resHeader['content-length'], 10)
    let chunkCount = Math.ceil(contentLength / limit)
    chunkCount = isNaN(chunkCount) || chunkCount === 0 ? 1 : chunkCount

    const chunks = []
    for (let i = 0; i < chunkCount; i++) {
      const start = i * limit
      let end = (i + 1) * limit - 1
      if (end >= contentLength) end = contentLength - 1

      const _headers = { ...headers, range: `bytes=${start}-${end}` }

      /**记录一次分片所有任务的queue中的taskId */
      const taskId = TId.createTaskId(taskIdPreffix, i)
      taskIdsMap.set(
        taskIdPreffix,
        taskIdsMap.get(taskIdPreffix) ? [...taskIdsMap.get(taskIdPreffix), taskId] : [taskId]
      )

      /**传入每一个分片的中断请求回调 */
      const abort = () => abortControllerMap.get(taskIdPreffix)?.abort('manually canceled')
      chunks[i] = queueDownload(url, _headers, params, signal, taskId, abort)
    }

    const chunksRes = await Promise.all(chunks)

    /**拼装切片, Uint8Array用于操作字节流*/
    const mergedArrayBuffer = new ArrayBuffer(contentLength)
    const mergedUint8Array = new Uint8Array(mergedArrayBuffer)
    chunksRes.forEach((res, idx) => {
      const { buffer } = res
      const chunkUint8Array = new Uint8Array(buffer)
      mergedUint8Array.set(chunkUint8Array, idx * limit)
    })

    return mergedArrayBuffer
  } catch (e) {
    throw new Error(`Failed to split download: ${e.message}`)
  }
}

const App = () => {
  const onclick = () => queue.cancel(new Set([12, 22, 32, 42, 43, 44, 45, 46]))
  return (
    <div>
      <Button onClick={onclick}>惹啊！！！！！</Button>
    </div>
  )
}

export default App
