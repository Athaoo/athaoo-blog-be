import React from 'react'
import { Editor, Viewer } from '@bytemd/react'
import type { EditorProps, ViewerProps } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/atom-one-dark.css'

const plugins = [gfm(), highlight(), frontmatter(), gemoji(), breaks()]

export const MDEditor = (props: EditorProps) => {
  return <Editor {...props} plugins={plugins} />
}

export const MDViewer = (props: ViewerProps) => {
  return <Viewer {...props} plugins={plugins} />
}
