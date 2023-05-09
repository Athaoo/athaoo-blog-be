import React from 'react'
import { Button, Form, Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRequest, apiLogin } from '../../api'
import { useMessage } from '../../components/message'

type Form = {
  username: string,
  password: string,
}
const Login: React.FC = () => {
  const navigate = useNavigate()
  const [res, logining, login] = useRequest(apiLogin)
  const [info, contextHolder] = useMessage()

  const onFinish = async (values: Form) => {
    navigate('admin')
    const { username, password } = values
    await login(username, password)
    info(res.message)
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
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
            <Button
              type="primary"
              onClick={() => {
                navigate('/register')
              }}>
              Register
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
