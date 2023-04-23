import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'antd'
import { Article } from '../../api/types'
import ArticleEditor, { ArticleForm } from './Editor'
import { getOneArticle } from '../../api'
import { useParams } from 'react-router-dom'

const App = () => {
  const { id } = useParams()
  return <></>
}

export default App
