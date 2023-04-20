import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'

import { Button, Card, Tag, Typography, Row, Col } from 'antd'
import { blue } from '@ant-design/colors'
import { getBlog } from './testData'
import { BlogPost } from '@src/types/articlePage'
import MarkdownRenderer from '@src/components/markdownRenderer'
import Mdxprovider from '@src/components/mdxProvider'

const { Title, Text } = Typography

type ContainerProps = {
  children: React.ReactNode
}
const ColClass = {
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}

const Tags = (tags) => {
  const tagColors = ['megenta', 'red', 'volcano', 'orange', 'lime', 'green', 'cyan', 'geekblue']
  const randomColor = () => {
    const idx = Math.round(Math.random() * tagColors.length)
    return tagColors[idx]
  }

  const MyTags = tags.map((tag) => (
    <Button shape={'round'} size={'large'} key={tag} style={{}}>
      {tag}
    </Button>
  ))

  return (
    <Row justify={'space-between'}>
      <Col span={24} style={ColClass}>
        {MyTags}
      </Col>
    </Row>
  )
}
const BackBtn = () => {
  const navigate = useNavigate()
  const back = () => {
    navigate('/article')
  }
  return <Button onClick={back}>返回首页</Button>
}

type HedaerProps = {
  data: BlogPost
}
const Header: React.FC<HedaerProps> = ({ data }) => {
  return (
    <Row justify={'space-between'} style={{ height: '100%' }}>
      <Col style={ColClass}>
        <BackBtn />
      </Col>
      <Col style={ColClass}>
        <Title level={4} style={{ margin: 'auto' }}>
          {data.title}
        </Title>
      </Col>
      <Col style={ColClass}>
        <Text>{Date.toString.call(data.createdAt)}</Text>
      </Col>
    </Row>
  )
}

const ArticleDetail: React.FC = () => {
  const { id } = useParams()
  const data = getBlog(id)

  return (
    <Card>
      <Card style={{ boxShadow: 'none' }} bordered={false}>
        <Header data={data} />
      </Card>
      <Card style={{ boxShadow: 'none' }} bordered={false}>
        {Tags(data.tags)}
      </Card>
      <Card style={{ boxShadow: 'none' }} bordered={false}>
        <MarkdownRenderer>{data.content}</MarkdownRenderer>
        {/* <Mdxprovider>{data.content}</Mdxprovider> */}
      </Card>
    </Card>
  )
}

export default ArticleDetail
