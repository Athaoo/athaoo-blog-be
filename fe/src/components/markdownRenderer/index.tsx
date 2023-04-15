import React from 'react'
import ReactMarkdown from 'react-markdown'
//代码高亮插件
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { useTheme } from '../../theme/index'

const CodeBlock = ({ language, value }) => {
  const { isDark } = useTheme()
  return (
    <SyntaxHighlighter language={language} style={isDark ? oneDark : oneLight}>
      {value}
    </SyntaxHighlighter>
  )
}

const MarkdownRenderer = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
      remarkPlugins={[remarkGfm, remarkMdx]}>
      {children}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer
