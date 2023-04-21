import { Button, Card } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor'
import testData from '@src/containers/articlePage/testData'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const App = () => {
  const [content, setContent] = useState('惹啊')

  useEffect(() => {
    setContent(testData[6].content)
  }, [])
  const onChange = (text, viewUpdate) => {
    setContent(text)
  }
  const onClick = (e) => {
    const json = JSON.stringify(content)
    console.log(json)
  }
  return (
    <Card>
      <Button onClick={onClick}>导出</Button>
      <MarkdownEditor value={content} onChange={onChange} style={{ minHeight: '500px' }} />
    </Card>
  )
}

export default App
