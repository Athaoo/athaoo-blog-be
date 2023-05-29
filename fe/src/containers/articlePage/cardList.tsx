import React from 'react'
import { Table, Tag, Dropdown, Menu, Button, Popconfirm, Card } from 'antd'
import { BlogPost } from '@src/types/articlePage'
import { Link } from 'react-router-dom'
import { getBlog } from './testData'
import Title from 'antd/es/skeleton/Title'

type MyCardProps = {
  title: string
  summary?: string
  cover?: string
  navTo?: string
}
const MyCard = ({ title, summary, cover, navTo }: MyCardProps) => {
  return <Card title={title} cover></Card>
}

const ArticleCardList = () => {
  return <></>
}

export default ArticleCardList
