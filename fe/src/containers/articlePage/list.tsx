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

// const LAZY_STEP = 2
const LAZY_STEP = 6

const ACard = ({ article, nav }: { article: Article; nav: (id: string) => void }) => {
  const { id, title, summary, createdAt, tags, cover } = article
  return (
    <div className="w-full h-full">
      <MyCard
        title={title}
        summary={summary}
        time={createdAt}
        tags={tags}
        cover={cover}
        onClick={() => nav(`${id}`)}
      />
    </div>
  )
}

const CardList = memo(({ articles }: { articles: Article[] }) => {
  const navigate = useNavigate()
  const nav = useCallback((id: string) => {
    navigate(`/article/${id}`)
  }, [])

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

  // 因为articles的引用每次都会变，memo并不能达到缓存的效果
  // const cachedArticles = useMemo(() => articles, [articles])

  const ifInited = useRef(false)
  const ifLoadOver = useRef(false)
  const [page, setPage] = useState(1)

  const loadMore = useCallback(() => {
    setPage((p) => p + 1)
  }, [])

  useEffect(() => {
    const req = async () => {
      try {
        const { data } = await getArticles({ pageLimit: LAZY_STEP * 2, pageNum: 0 })
        setArticles(data)

        ifInited.current = true
      } catch (e) {
        console.error(e)
      }
    }
    req()
  }, [])

  useEffect(() => {
    const req = async () => {
      try {
        const { data } = await getArticles({ pageLimit: LAZY_STEP, pageNum: page })
        setArticles((articles) => [...articles, ...data])
        if (data.length < LAZY_STEP) {
          ifLoadOver.current = true
        }
      } catch (e) {
        console.error(e)
      }
    }
    if (ifInited.current && !ifLoadOver.current) {
      req()
    }
  }, [page])

  return !articles && loading ? (
    <Spin />
  ) : (
    <Card style={{ height: '100%' }}>
      <CardList articles={articles} />
      {ifLoadOver.current ? null : <Button onClick={() => loadMore()}>加载更多</Button>}
    </Card>
  )
}

export default BlogList
