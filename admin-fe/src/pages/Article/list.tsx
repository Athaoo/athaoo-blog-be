import React, { useState, useEffect, useMemo } from 'react'
import { Table, Tag, Popconfirm, Card, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { Article } from '../../api/types'
import { getAllArticles } from '../../api'

const useGetList: () => [boolean, Article[]] = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Article[]>()

  const request = async () => {
    try {
      const res = await getAllArticles()
      console.log(`🚀 -> file: list.tsx:14 -> request -> res:`, res)

      setData(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    request()
  }, [])
  return [loading, data]
}
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    render: (text, record: Article) => <Link to={``}>{record.title}</Link>,
  },
  {
    title: '摘要',
    dataIndex: 'summary',
    render: (text, record: Article) => <Link to={``}>{record.title}</Link>,
  },
  {
    title: '时间',
    dataIndex: 'createdAt',
    render: (text, record: Article) => {
      return <>{JSON.stringify(new Date(record.createdAt))}</>
    },
  },
  {
    title: '标签',
    dataIndex: 'tags',
    render: (text, record: Article) => (
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
    render: (text, record: Article) => (
      <Popconfirm title="确定log?" onConfirm={() => console.log(record)}>
        <a>log这一行的数据</a>
      </Popconfirm>
    ),
  },
]
const ArticleList = () => {
  const [loading, data] = useGetList()
  return (
    <Card style={{ height: '100%' }}>
      {loading ? <Spin /> : <Table columns={columns} dataSource={data} rowKey="id" />}
    </Card>
  )
}

export default ArticleList
