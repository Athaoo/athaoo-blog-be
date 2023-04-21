import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, Input, FormRule } from 'antd'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { Article } from '../../api/types'
import { createArticle } from '../../api'

const useAddArticle = () => {
  const [res, setRes] = useState<Article>()
  const [loading, setLoading] = useState(false)

  const addArticle = async (article: Article) => {
    try {
      const res = await createArticle(article)
      setRes(res.data)
    } catch (e) {
      console.error(e.stack)
    } finally {
      setLoading(false)
    }
  }

  return { res, loading, addArticle }
}

const App = () => {
  const [content, setContent] = useState('惹啊')
  const [form] = Form.useForm()
  const { res, loading, addArticle } = useAddArticle()
  const onContentChange = (text, viewUpdate) => {
    setContent(text)
  }

  const onFinish = async (values) => {
    const tagsArray = values.tags.split(',').map((tag: string) => tag.trim())
    const article = {
      ...values,
      content: JSON.stringify(content),
      tags: tagsArray,
    }
    await addArticle(article)
  }

  return (
    <Card>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="标签" name="tags" rules={[{ required: true, message: '请输入标签' }]}>
          <Input placeholder="请输入标签，使用逗号分隔" />
        </Form.Item>
        <Form.Item label="摘要" name="summary">
          <Input.TextArea placeholder="请输入摘要（可选）" />
        </Form.Item>
        <Form.Item label="作者" name="author">
          <Input placeholder="请输入作者（可选）" />
        </Form.Item>
        <Form.Item label="正文">
          <MarkdownEditor
            value={content}
            onChange={onContentChange}
            style={{ minHeight: '500px' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default App
