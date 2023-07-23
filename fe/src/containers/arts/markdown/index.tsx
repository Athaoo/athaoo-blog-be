import { Button, Card } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import testData from '@src/containers/articlePage/testData'
import { Editor } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import 'bytemd/dist/index.css'
import '@src/styles/tailwind.css'

const plugins = [gfm()]

const App = () => {
  const [content, setContent] = useState('惹啊')

  useEffect(() => {
    setContent(testData[6].content)
  }, [])
  const onChange = (text) => {
    setContent(text)
  }
  const onClick = (e) => {
    const json = JSON.stringify(content)
    console.log(json)
  }
  return (
    <Card className="w-full h-full" bodyStyle={{ width: '100%', height: '100%' }}>
      <Button onClick={onClick}>导出</Button>
      <Editor value={content} onChange={onChange} plugins={plugins} />
    </Card>
  )
}

export default App
