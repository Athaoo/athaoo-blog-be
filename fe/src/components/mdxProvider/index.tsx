import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { ReactChildrenProps } from '@src/types/types'
import Mdxtest from '@src/assets/mdx/testMdx.mdx'

const Mdxprovider: React.FC<ReactChildrenProps> = ({ children }) => {
  return (
    <MDXProvider>
      <Mdxtest />
    </MDXProvider>
  )
}

export default Mdxprovider
