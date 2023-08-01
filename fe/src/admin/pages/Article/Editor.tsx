import React, { useState, useEffect, useCallback } from 'react'
import type { Article } from '@api/types'
import { Card, Input, Button, Form, FormProps, Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { RenderTest } from '../../components/renderTest'

import { MDEditor, MDViewer } from '@src/admin/components/markdown'

export type ArticleForm = {
  title: string
  summary?: string
  content: string
  author?: string
  tags: string
  cover?: File
}

export type ArticleInitialFormType = Omit<ArticleForm, 'cover'> & {
  cover?: string
}

export type ArticleEditorProps = {
  initialValues?: ArticleInitialFormType
  onSubmit: (formData: ArticleForm) => void
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const ArticleEditor = ({ initialValues, onSubmit }: ArticleEditorProps) => {
  const _initialValues = initialValues ?? {
    title: '',
    summary: '',
    author: '',
    content: '',
    tags: '',
    cover: '',
  }
  const [content, setContent] = useState(_initialValues.content)
  const initFileList = !_initialValues.cover
    ? []
    : [
        {
          uid: 'init',
          name: 'init.png',
          url: _initialValues.cover as string,
        },
      ]
  const [fileList, setFileList] = useState<UploadFile[]>(initFileList)

  const [form] = Form.useForm()

  const onContentChange = useCallback((text: string) => {
    setContent(text)
  }, [])

  const handleBeforeUploadCover: UploadProps['beforeUpload'] = useCallback(() => false, [])
  const handleCoverOnChange: UploadProps['onChange'] = useCallback(({ file }) => {
    setFileList([file])
  }, [])

  const customReq = useCallback(() => null, [])

  const onFinish = (formData) => {
    formData.content = content
    formData.cover = fileList[0]
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
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleCoverOnChange}
          beforeUpload={handleBeforeUploadCover}
          customRequest={customReq}
          maxCount={1}>
          <Button>上传封面惹</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="正文">
        <MDEditor value={content} onChange={onContentChange} />
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
