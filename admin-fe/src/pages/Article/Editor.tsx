import React, { useState, useEffect, useCallback } from 'react'
import { Article } from '../../api/types'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { Card, Input, Button, Form, FormProps, Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { RenderTest } from '../../components/renderTest'
import { Editor, Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import 'bytemd/dist/index.css'

export type ArticleForm = {
  title: string
  summary?: string
  content: string
  author?: string
  tags: string
  cover?: File
}

export type ArticleEditorProps = {
  initialValues?: ArticleForm
  onSubmit: (formData: ArticleForm) => void
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

// bytemd配置
const plugins = [gfm()]
const ArticleEditor = ({ initialValues, onSubmit }: ArticleEditorProps) => {
  console.log(`🚀 -> ArticleEditor -> 1:`, 1)

  const _initialValues = initialValues ?? {
    title: '',
    summary: '',
    author: '',
    content: '',
    tags: '',
  }
  const [content, setContent] = useState(_initialValues.content)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()

  const onContentChange = useCallback((text: string) => {
    setContent(text)
  }, [])

  const handleBeforeUploadCover: UploadProps['beforeUpload'] = useCallback(
    (file: RcFile, FileList: RcFile[]) => {
      console.log(
        `🚀 -> consthandleBeforeUploadCover:UploadProps['beforeUpload']=useCallback -> file:`,
        file
      )
      setFileList([file])
      return false
    },
    []
  )

  const onFinish = (formData) => {
    formData.content = content
    formData.cover = fileList[0]
    console.log(`🚀 -> onFinish -> fileList:`, fileList)
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
      <Form.Item label="封面">
        <Upload listType="picture-circle" beforeUpload={handleBeforeUploadCover} maxCount={1}>
          <Button>上传上传</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="正文">
        <Editor value={content} onChange={onContentChange} plugins={plugins} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
      <RenderTest />
    </Form>
  )
}

export default ArticleEditor
