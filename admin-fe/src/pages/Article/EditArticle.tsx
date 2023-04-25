import React, { useEffect, useRef, useState } from 'react'
import { Card, Spin } from 'antd'
import { Article, UpdateArticleType } from '../../api/types'
import ArticleEditor, { ArticleForm } from './Editor'
import { getOneArticle, useRequest, updateOneArticle } from '../../api'
import { useParams } from 'react-router-dom'

const App = () => {
  const { id } = useParams()
  console.log(`🚀 -> file: EditArticle.tsx:10 -> App -> id:`, id)
  const [article, loading, reqOneArticle] = useRequest(getOneArticle)

  const formatArticleForm = (article: Article) => {
    return {
      ...article,
      tags: article.tags.reduce((res, tag) => (res == '' ? tag : `${res},${tag}`), ''),
      content: JSON.parse(article.content),
    }
  }
  useEffect(() => {
    const cb = async () => {
      await reqOneArticle(Number(id))
      console.log(`🚀 -> file: EditArticle.tsx:17 -> .then -> article:`, article)
    }

    cb()
  }, [])

  const onSubmit = (article: ArticleForm) => {}
  return (
    <Card>
      {loading ? (
        <Spin />
      ) : (
        <ArticleEditor initialValues={formatArticleForm(article)} onSubmit={onSubmit} />
      )}
    </Card>
  )
}

export default App
