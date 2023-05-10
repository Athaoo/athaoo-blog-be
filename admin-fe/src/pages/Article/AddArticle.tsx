import React, { useEffect, useRef, useState } from 'react'
import { Card, message } from 'antd'
import { Article, MySuccessRes } from '../../api/types'
import ArticleEditor, { ArticleForm } from './Editor'
import { createArticle, useRequest } from '../../api'

const App = () => {
  const [loading, addArticle] = useRequest(createArticle)
  const [msgApi, contextHolder] = message.useMessage()
  const [res, setRes] = useState<MySuccessRes>(null)

  useEffect(() => {
    console.log(`🚀 -> useEffect -> res:`, res)
    res?.message && msgApi.info(res.message)
  }, [res])

  const onSubmit = async (values: ArticleForm) => {
    const tagsArray = values.tags.split(',').map((tag: string) => tag.trim())
    const article = {
      ...values,
      content: JSON.stringify(values.content),
      tags: tagsArray,
    } as Article
    const response = await addArticle(article)
    setRes(response)
  }

  return (
    <Card>
      {contextHolder}
      <ArticleEditor onSubmit={onSubmit} />
    </Card>
  )
}

export default App
