import React, { useEffect, createContext, useContext, useState } from 'react'
import { Card, Col, Menu, MenuProps, Row, theme, Divider, Input, Button } from 'antd'
import { ReactChildrenProps } from '@src/types/types'

const arr = [6, 4, 8, 1, 2, 5, 5, 6]

const buildHeap = (arr: Array<number>) => {
  const len = arr.length
  for (let i = Math.floor(len >> 1); i >= 0; i--) {
    heapify(arr, len - 1, i)
  }
  return arr
}

const heapify = (arr: Array<number>, len: number, i: number) => {
  const l = (i << 1) + 1,
    r = (i << 1) + 2
  let max = i

  l <= len && arr[l] > arr[max] && (max = l)
  r <= len && arr[r] > arr[max] && (max = r)

  if (max != i) {
    swap(arr, i, max)
    heapify(arr, len, l)
    heapify(arr, len, r)
  }
}

const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const heapSort = (arr: Array<number>) => {
  buildHeap(arr)

  const len = arr.length
  for (let i = len - 1; i > 0; i--) {
    swap(arr, 0, i)
    heapify(arr, i - 1, 0)
  }

  return arr
}

const App = () => {
  return <>Vlist</>
}

export default App
