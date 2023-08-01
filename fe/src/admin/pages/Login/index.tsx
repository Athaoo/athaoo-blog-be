import React from 'react'
import { Button, Form, Input, Space, theme } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRequest } from '@api/index'
import { apiLogin } from '@api/admin'
import { useMessage } from '../../components/message'

type Form = {
  username: string
  password: string
}

const { useToken } = theme
const Login: React.FC = () => {
  const navigate = useNavigate()
  const [logining, login] = useRequest(apiLogin)
  const [info, contextHolder] = useMessage()
  const { token } = useToken()

  const onFinish = async (values: Form) => {
    try {
      const { username, password } = values
      const res = await login(username, password)
      info(res.message)
      window.sessionStorage.setItem('token', res.token)
      navigate('admin')
      console.log('Success:', values)
    } catch (e) {
      console.log(e)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={{ width: '100%', height: '100%', background: token.colorBgContainer }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          width: '24vw',
          height: '100%',
        }}>
        {contextHolder}
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              {/* <Button
                type="primary"
                onClick={() => {
                  navigate('/register')
                }}>
                Register
              </Button> */}
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
