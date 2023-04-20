import React from 'react'

import { Table, Tag, Dropdown, Menu, Button, Popconfirm, Card } from 'antd'
import { BlogPost } from '@src/types/articlePage'
import { Link } from 'react-router-dom'
import { getBlog } from './testData'

const testBlogData = [1, 2, 3, 4, 5, 6, 7, 8].map((id) => getBlog(`${id}`))
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
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
  return (
    <Card style={{ height: '100%' }}>
      <Table columns={columns} dataSource={testBlogData} rowKey="id" />
    </Card>
  )
}

export default BlogList
