import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'antd'
import { Article } from '../../api/types'
import ArticleEditor, { ArticleForm } from './Editor'
import { createArticle } from '../../api'
import { AddArticleType } from '../../api/types'

const useAddArticle = () => {
  const [res, setRes] = useState<Article>()
  const [loading, setLoading] = useState(false)

  const addArticle = async (article: AddArticleType) => {
    try {
      const res = await createArticle(article)
      setRes(res.data)
      console.log(`🚀 -> file: AddArticle.tsx:10 -> useAddArticle -> res:`, res)
    } catch (e) {
      console.error(e.stack)
    } finally {
      setLoading(false)
    }
  }

  return { res, loading, addArticle }
}

const App = () => {
  const { res, loading, addArticle } = useAddArticle()

  const onSubmit = async (values: ArticleForm) => {
    const tagsArray = values.tags.split(',').map((tag: string) => tag.trim())
    const article = {
      ...values,
      content: JSON.stringify(values.content),
      tags: tagsArray,
    } as Article
    await addArticle(article)
  }

  return (
    <Card>
      <ArticleEditor onSubmit={onSubmit} />
    </Card>
  )
}

export default App
