import React from 'react'
import { Table, Tag, Dropdown, Menu, Button, Popconfirm, Card } from 'antd'
import { BlogPost } from '@src/types/articlePage'
import { Link } from 'react-router-dom'
import { getBlog } from './testData'
import '@src/styles/tailwind.css'
import ageni from '@assets/imgs/ageni.png'
import { formatDate } from '@src/utils/format'

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

type MyCardProps = {
  title: string
  summary: string
  time: Date
  tags: string[]
}

const MyCard = ({ title, summary, tags, time }: MyCardProps) => {
  return (
    <div className="flex relative rounded-3xl shadow-lg w-full p-0 overflow-hidden transform transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-3xl">
      <img src={ageni} className=" w-1/2 h-full overflow-hidden object-cover" alt="Card Image" />
      <div className="flex flex-1 flex-col ">
        <div className="w-full h-32">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
        </div>
        <div className="flex-1 w-full">
          <p className="text-gray-600">{summary}</p>
        </div>
        <div className="flex-1 w-full">
          <p className="text-gray-600">{formatDate(time)}</p>
        </div>
        <div className="flex-1 w-full">
          <div className="flex space-x-2">
            {tags.map((tag) => (
              <span className="text-blue-500">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
const BlogList: React.FC = () => {
  return (
    <Card style={{ height: '100%' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {testBlogData.map(({ title, summary, createdAt, tags }) => {
          return <MyCard title={title} summary={summary} time={createdAt} tags={tags} />
        })}
      </div>

      <Table columns={columns} dataSource={testBlogData} rowKey="id" />
    </Card>
  )
}

export default BlogList
