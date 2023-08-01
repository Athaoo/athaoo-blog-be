import React, { useEffect, useRef, useState } from 'react'
import { App, Card, Spin, message } from 'antd'
import ArticleEditor, { ArticleForm } from './Editor'
import { getOneArticle, useRequest } from '@api/index'
import { updateOneArticle } from '@api/admin'
import type { Article } from '@api/types'
import { useParams } from 'react-router-dom'

const EditArticle = () => {
  const { id } = useParams()
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
      const article = await reqOneArticle(parseInt(id))
      setArticle(article)
    }

    req()
  }, [])

  const onSubmit = async (article: ArticleForm) => {
    const updateParam = {
      ...article,
      content: JSON.stringify(article.content),
      tags: JSON.stringify(article.tags.split(',').map((tag) => tag.trim())),
    }

    try {
      await reqUpdateOneArticle(parseInt(id), updateParam)
    } catch (e) {
      console.log(e)
    }
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
