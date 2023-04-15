import React, { PropsWithChildren, ReactNode } from 'react'
import ReactDOM from 'react-dom'

type DialogProps = {
  children?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}
const Dialog: React.FC<DialogProps> = (props) => {
  const { children, header, footer } = props
  //获取传递的属性和插槽信息
  return (
    <div className="dialog-box">
      <div className="header">
        {header}
        <br />
        {children}
        <br />
        {footer}
      </div>
      <div className="main"></div>
      <div className="footer"></div>
    </div>
  )
}
export default Dialog
