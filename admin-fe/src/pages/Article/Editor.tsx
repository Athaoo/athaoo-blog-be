import React, { useState, useEffect } from 'react'
import { Article } from '../../api/types'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { Card, Input, Button, Form, FormProps } from 'antd'

export type ArticleForm = {
  title: string
  summary?: string
  content: string
  author?: string
  tags: string
}

export type ArticleEditorProps = {
  initialValues?: ArticleForm
  onSubmit: (formData: ArticleForm) => void
}
const ArticleEditor = ({ initialValues, onSubmit }: ArticleEditorProps) => {
  const _initialValues = initialValues ?? {
    title: '',
    summary: '',
    author: '',
    content: '',
    tags: '',
  }
  const [content, setContent] = useState(_initialValues.content)
  const [form] = Form.useForm()
  const onContentChange = (text, viewUpdate) => {
    setContent(text)
  }

  const onFinish = (formData) => {
    formData.content = content
    onSubmit(formData)
  }

  return (
    <Form initialValues={_initialValues} layout="vertical" form={form} onFinish={onFinish}>
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
        <MarkdownEditor value={content} onChange={onContentChange} style={{ minHeight: '500px' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ArticleEditor
