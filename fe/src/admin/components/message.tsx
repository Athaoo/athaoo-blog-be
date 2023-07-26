import { message } from 'antd'

export const useMessage = () => {
  const [msgApi, contextHolder] = message.useMessage()

  const info = (text: string) => {
    msgApi.info(text)
  }

  return [info, contextHolder] as const
}
