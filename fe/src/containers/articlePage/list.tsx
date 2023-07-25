import React, {
  useEffect,
  useCallback,
  memo,
  useMemo,
  useState,
  useLayoutEffect,
  useReducer,
  useRef,
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

const LAZY_STEP = 2
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

const ACard = ({ article, nav }: { article: Article; nav: (id: string) => void }) => {
  console.log(`🚀 -> file: list.tsx:40 -> ACard -> article:`, article)
  const { id, title, summary, createdAt, tags, cover } = article
  return (
    <div className="w-full h-full">
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
}

const CardList = memo(({ articles }: { articles: Article[] }) => {
  const navigate = useNavigate()
  const nav = useCallback((id: string) => {
    navigate(`/article/${id}`)
  }, [])
  console.log(`🚀 -> file: list.tsx:40 -> CardList -> articles:`, articles)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      {articles.map((article) => {
        return <ACard key={article.id} article={article} nav={nav} />
      })}
    </div>
  )
})

const BlogList: React.FC = () => {
  const { loading, runAsync: getArticles } = useMyHttpRequest(getAllArticles)

  const [articles, setArticles] = useState<Article[]>([])
  const cachedArticles = useMemo(() => articles, [articles])

  const ifInited = useRef(false)

  const [pageState, pageDispatch] = useReducer(pageReducer, {
    curItemSum: LAZY_STEP,
    pageNum: 1,
  })

  const loadMore = useCallback(() => {
    pageDispatch({
      type: 'ADD',
      payload: undefined,
    })
  }, [])

  useEffect(() => {
    const req = async () => {
      try {
        const { data } = await getArticles({ pageLimit: LAZY_STEP * 2, pageNum: 0 })
        console.log(`🚀 -> file: list.tsx:93 -> req -> res:`, data)
        setArticles(data)

        ifInited.current = true
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
        console.log(`🚀 -> file: list.tsx:93 -> pageState.pageNum:`, pageState.pageNum)
        const { data } = await getArticles({ pageLimit: LAZY_STEP, pageNum: pageState.pageNum })
        console.log(`🚀 -> file: list.tsx:93 -> req -> res:`, data)
        setArticles((articles) => [...articles, ...data])
      } catch (e) {
        console.error(e)
      }
    }
    if (ifInited.current) {
      req()
    }
  }, [pageState])

  return !cachedArticles && loading ? (
    <Spin />
  ) : (
    <Card style={{ height: '100%' }}>
      <CardList articles={cachedArticles} />
      <Button onClick={() => loadMore()}>加载更多</Button>
    </Card>
  )
}

export default BlogList
