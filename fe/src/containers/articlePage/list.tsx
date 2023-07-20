import React, { useEffect, useCallback, memo, useMemo, useState, useLayoutEffect } from 'react'
import { Table, Tag, Dropdown, Menu, Button, Popconfirm, Card, Spin } from 'antd'
import { BlogPost } from '@src/types/articlePage'
import { Link, useNavigate } from 'react-router-dom'
import { getBlog } from './testData'
import '@src/styles/tailwind.css'
import { useRequest, getAllArticles } from '@src/api'
import { Article } from '@src/api/types'
import MyCard from './ArticleCard'

const testBlogData = [1, 2, 3, 4, 5, 6, 7, 8].map((id) => getBlog(`${id}`))
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    render: (text, record: BlogPost) => <Link to={`/article/${record.id}`}>{record.title}</Link>,
  },
  {
    title: '时间',
    dataIndex: 'createdAt',
    render: (text, record: BlogPost) => {
      return <>{JSON.stringify(record.createdAt)}</>
    },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    render: (text, record: BlogPost) => (
      <>
        {record.tags.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record: BlogPost) => (
      <Popconfirm title="确定log?" onConfirm={() => console.log(record)}>
        <a>log这一行的数据</a>
      </Popconfirm>
    ),
  },
]

const BlogList: React.FC = () => {
  const [loading, apiGetAll] = useRequest(getAllArticles)
  const [articles, setArticles] = useState<Article[]>(null)
  const cachedArticles = useMemo(() => articles, [articles])
  const navigate = useNavigate()

  const nav = useCallback((id: string) => {
    navigate(`/article/${id}`)
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
      const res = await apiGetAll()
      console.log(`🚀 -> file: list.tsx:93 -> req -> res:`, res)
      setArticles(res)
    }
    req()
  }, [])

  return !cachedArticles || loading ? (
    <Spin />
  ) : (
    <Card style={{ height: '100%' }}>
      <CardList articles={cachedArticles} />
      <Table columns={columns} dataSource={cachedArticles} rowKey="id" />
    </Card>
  )
}

export default BlogList
