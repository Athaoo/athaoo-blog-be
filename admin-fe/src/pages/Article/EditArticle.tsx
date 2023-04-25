import React, { useEffect, useRef, useState } from 'react'
import { Card, Spin, message } from 'antd'
import { Article, UpdateArticleType } from '../../api/types'
import ArticleEditor, { ArticleForm } from './Editor'
import { getOneArticle, useRequest, updateOneArticle } from '../../api'
import { useParams } from 'react-router-dom'

// TODO article会导致App reRender两次
const App = () => {
  const id = parseInt(useParams().id)
  console.log(`🚀 -> file: EditArticle.tsx:10 -> App -> id:`, id)
  const [article, loading, reqOneArticle] = useRequest(getOneArticle)
  const [msg, ifUpdating, reqUpdateOneArticle] = useRequest(updateOneArticle)

  const formatArticleForm = (article: Article) => {
    return {
      ...article,
      tags: article.tags.reduce((res, tag) => (res == '' ? tag : `${res},${tag}`), ''),
      content: JSON.parse(article.content),
    }
  }
  useEffect(() => {
    reqOneArticle(id)
  }, [])

  useEffect(() => {
    console.log(`🚀 -> file: EditArticle.tsx:17 -> .then -> article:`, article)
  }, [article])

  useEffect(() => {
    console.log(`🚀 -> file: EditArticle.tsx:33 -> useEffect -> msg:`, msg)
    msg
  }, [msg])

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
      {loading ? (
        <Spin />
      ) : (
        <ArticleEditor initialValues={formatArticleForm(article)} onSubmit={onSubmit} />
      )}
    </Card>
  )
}

export default App
