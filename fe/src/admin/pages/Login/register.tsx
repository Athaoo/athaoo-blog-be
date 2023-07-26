import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRequest } from '@api/index'
import { apiRegister } from '@api/admin'
import { useMessage } from '../../components/message'

type Form = {
  username: string
  password: string
}
const Register: React.FC = () => {
  const navigate = useNavigate()
  const [registering, register] = useRequest(apiRegister)
  const [info, contextHolder] = useMessage()
  const [msg, setMsg] = useState('')

  useEffect(() => {
    msg && info(msg)
  }, [msg])

  const onFinish = async (values: Form) => {
    const { username, password } = values
    const res = await register(username, password)
    setMsg(res.message)
    navigate('login')
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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button
              type="primary"
              onClick={() => {
                navigate('/login')
              }}>
              Back to login
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
