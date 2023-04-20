import React, { useEffect, useState } from 'react'
import api, {
  getTestData,
  getTestCorsData,
  getTestArticleData1,
  getTestArticleData2,
} from '../../api'
import { Article } from '../../api/types'
import { Button, Card, Col, Row, Spin } from 'antd'

const useFetchTestData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setData(null)
      setLoading(true)
      const response = await getTestData()
      console.log(`🚀 -> file: TestApi.tsx:14 -> fetchData -> response:`, response)
      setData(response.data)
    } catch (err) {
      console.error(`error fetching data`, err)
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, fetchData]
}

const useFetchTestCorsData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setData(null)
      setLoading(true)
      const response = await getTestCorsData()
      console.log(`🚀 -> file: TestApi.tsx:35 -> fetchData -> response:`, response)
      setData(response.data)
    } catch (err) {
      console.error(`error fetching data`, err)
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, fetchData]
}
const useFetchTestArticleData1 = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setData(null)
      setLoading(true)
      const response = await getTestArticleData1()
      console.log(`🚀 -> file: TestApi.tsx:35 -> fetchData -> response:`, response)
      setData(response.data.title)
    } catch (err) {
      console.error(`error fetching data`, err)
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, fetchData]
}
const useFetchTestArticleData2 = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setData(null)
      setLoading(true)
      const response = await getTestArticleData2()
      console.log(`🚀 -> file: TestApi.tsx:35 -> fetchData -> response:`, response)
      setData(response.data.title)
    } catch (err) {
      console.error(`error fetching data`, err)
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, fetchData]
}

const Container = () => {
  const [data, loading, fetchData] = useFetchTestData()
  const [data2, loading2, fetchData2] = useFetchTestCorsData()
  const [data3, loading3, fetchData3] = useFetchTestArticleData1()
  const [data4, loading4, fetchData4] = useFetchTestArticleData2()

  return (
    <Row style={{ height: '100%', width: '100%' }}>
      <Col span={8}>
        <Card>
          <div>
            <h2>测试接口 惹啊</h2>
          </div>
          <Button type="default" size="large" onClick={fetchData}>
            测试1
          </Button>
          <Button type="default" size="large" onClick={fetchData2}>
            测试2
          </Button>
          <Button type="default" size="large" onClick={fetchData3}>
            测试3
          </Button>
          <Button type="default" size="large" onClick={fetchData4}>
            测试4
          </Button>
        </Card>
      </Col>
      <Col span={16}>
        <Row>
          <Col>
            {loading ? (
              <Spin />
            ) : (
              <Card>
                API 1 result:{'   '} {data}
              </Card>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {loading2 ? (
              <Spin />
            ) : (
              <Card>
                API 2 result:{'   '} {data2}
              </Card>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {loading3 ? (
              <Spin />
            ) : (
              <Card>
                API 2 result:{'   '} {data3}
              </Card>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {loading4 ? (
              <Spin />
            ) : (
              <Card>
                API 4 result:{'   '} {data4}
              </Card>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Container
