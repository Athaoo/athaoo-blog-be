import React, { useState, useEffect, useMemo } from 'react'
import { Table, Tag, Popconfirm, Card, Spin, message } from 'antd'
import { Link } from 'react-router-dom'
import type { Article } from '@api/types'
import { useRequest } from '@api/index'
import { getAllArticles, deleteOneArticle } from '@api/admin'
import { useMessage } from '../../components/message'
import { formatDate } from '@utils/format'

const DeleteConfirm = ({ text, id }: { text: string; id: number }) => {
  const [isLoading, reqDelete] = useRequest(deleteOneArticle)
  const [msgApi, contextHolder] = message.useMessage()

  return (
    <Popconfirm
      title={text}
      onConfirm={() => {
        reqDelete(id)
      }}>
      {contextHolder}
      <a>删除</a>
    </Popconfirm>
  )
}
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    render: (text, record: Article) => (
      <Link to={`/admin/article/edit/${record.id}`}>{record.title}</Link>
    ),
  },
  {
    title: '摘要',
    dataIndex: 'summary',
  },
  {
    title: '时间',
    dataIndex: 'createdAt',
    render: (text, record: Article) => {
      return <>{formatDate(record.createdAt)}</>
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
    render: (text, record: Article) => <DeleteConfirm text={'删除'} id={record.id} />,
  },
]
const ArticleList = () => {
  const [isLoading, reqAll] = useRequest(getAllArticles)
  const [articles, setArticles] = useState<Article[]>(null)

  useEffect(() => {
    const req = async () => {
      try {
        const articles = await reqAll()
        setArticles(articles)
      } catch (e) {
        console.log(e)
      }
    }
    req()
  }, [])

  return (
    <Card style={{ height: '100%' }}>
      {isLoading ? <Spin /> : <Table columns={columns} dataSource={articles} rowKey="id" />}
    </Card>
  )
}

export default ArticleList
