import React, { useEffect, useRef, useState } from 'react'
import { App, Card, Spin, message } from 'antd'
import { Article, UpdateArticleType } from '../../api/types'
import ArticleEditor, { ArticleForm } from './Editor'
import { getOneArticle, useRequest, updateOneArticle } from '../../api'
import { useParams } from 'react-router-dom'
import { RenderTest } from '../../components/renderTest'

const EditArticle = () => {
  const { id } = useParams()
  console.log(`🚀 -> file: EditArticle.tsx:10 -> App -> id:`, id)
  const [loading, reqOneArticle] = useRequest(getOneArticle)
  const [isUpdating, reqUpdateOneArticle] = useRequest(updateOneArticle)
  const [messageApi, contextHolder] = message.useMessage()
  const [article, setArticle] = useState<Article>(null)

  const formatArticleForm = (article: Article) => {
    return {
      ...article,
      tags: article.tags.reduce((res, tag) => (res == '' ? tag : `${res},${tag}`), ''),
      content: JSON.parse(article.content),
    }
  }
  useEffect(() => {
    const req = async () => {
      const article = await reqOneArticle(id)
      setArticle(article)
    }

    req()
  }, [])

  const onSubmit = async (article: ArticleForm) => {
    const updateParam = {
      ...article,
      content: JSON.stringify(article.content),
      tags: article.tags.split(',').map((tag) => tag.trim()),
    }
    console.log(`🚀 -> file: EditArticle.tsx:32 -> onSubmit -> updateParam:`, updateParam)

    await reqUpdateOneArticle(id, updateParam)
  }
  return (
    <Card>
      {contextHolder}
      {loading ? (
        <Spin />
      ) : (
        <ArticleEditor initialValues={formatArticleForm(article)} onSubmit={onSubmit} />
      )}
    </Card>
  )
}

export default EditArticle
