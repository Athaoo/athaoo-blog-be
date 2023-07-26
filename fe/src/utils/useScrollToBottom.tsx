import React, { useEffect, useState, useContext, createContext } from 'react'
import { useScroll } from 'ahooks'
import type { RefObject } from 'react'

const equal = (a, b, range = 0) => Math.abs(a - b) <= range

// 本想用这个实现滚动自动加载更多，但是发现并不理想，因为scroll的容器在外层
// 而需要消费这一状态的子组件在深层，需要用context实现
export const useScrollNearBottom = (ref: RefObject<HTMLElement>, nearRange = 0) => {
  const { top: scrollTop } = useScroll(ref)
  const [isScrollNearBtm, setIsScrollToBtm] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const scrollHeight = ref.current.scrollHeight
    const clientHeight = ref.current.clientHeight
    if ((equal(scrollHeight - scrollTop, clientHeight), nearRange)) {
      setIsScrollToBtm(true)
    } else {
      setIsScrollToBtm(false)
    }
  }, [scrollTop, nearRange, ref])

  return { isScrollNearBtm }
}
