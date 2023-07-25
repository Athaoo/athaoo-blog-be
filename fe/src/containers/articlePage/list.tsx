import React, {
  useEffect,
  useCallback,
  memo,
  useMemo,
  useState,
  useLayoutEffect,
  useReducer,
} from 'react'
import { Table, Tag, Dropdown, Menu, Button, Popconfirm, Card, Spin, Skeleton } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import '@src/styles/tailwind.css'
import { useRequest, getAllArticles, useMyHttpRequest } from '@src/api'
import type { Article, ArticleListQueryType } from '@src/api/types'
import MyCard from './ArticleCard'

type PageState = {
  curItemSum: number
  pageNum: number
}
type PageActions = {
  type: 'ADD'
  payload: undefined | number
}

const LAZY_STEP = 6
const pageReducer = (state: PageState, action: PageActions) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        curItemSum: state.curItemSum + LAZY_STEP,
        pageNum: state.pageNum + 1,
      }
  }
}

const BlogList: React.FC = () => {
  const { loading, runAsync: getArticles } = useMyHttpRequest(getAllArticles)

  const [articles, setArticles] = useState<Article[]>([])
  const cachedArticles = useMemo(() => articles, [articles])
  const navigate = useNavigate()

  const [pageState, pageDispatch] = useReducer(pageReducer, {
    curItemSum: LAZY_STEP,
    pageNum: 1,
  })

  const nav = useCallback((id: string) => {
    navigate(`/article/${id}`)
  }, [])

  const loadMore = useCallback(() => {
    pageDispatch({
      type: 'ADD',
      payload: undefined,
    })
  }, [])

  const CardList = memo(({ articles }: { articles: Article[] }) => {
    console.log(`🚀 -> CardList -> cachedArticles:`, articles)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {articles.map(({ id, title, summary, createdAt, tags, cover }) => {
          return (
            <div key={id} className="w-full h-full">
              <MyCard
                title={title}
                summary={summary}
                time={createdAt}
                tags={tags}
                cover={cover}
                onClick={() => nav(id)}
              />
            </div>
          )
        })}
      </div>
    )
  })

  useEffect(() => {
    const req = async () => {
      try {
        const { data } = await getArticles({ pageLimit: 12, pageNum: 0 })
        console.log(`🚀 -> file: list.tsx:93 -> req -> res:`, data)
        setArticles((articles) => data)
      } catch (e) {
        console.error(e)
      }
    }
    req()
  }, [])

  useEffect(() => {
    console.log(`🚀 -> useEffect -> pageState:`, { ...pageState })
    const req = async () => {
      try {
        const { data } = await getArticles({ pageLimit: LAZY_STEP, pageNum: pageState.pageNum })
        console.log(`🚀 -> file: list.tsx:93 -> req -> res:`, data)
        setArticles((articles) => [...articles, ...data])
      } catch (e) {
        console.error(e)
      }
    }
    // req()
  }, [pageState])

  return !cachedArticles || loading ? (
    <Spin />
  ) : (
    <Card style={{ height: '100%' }}>
      <CardList articles={cachedArticles} />
      <Button onClick={() => loadMore()}>加载更多</Button>
    </Card>
  )
}

export default BlogList
