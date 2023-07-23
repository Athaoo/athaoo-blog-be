import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  InputNumber,
  Typography,
  Button,
  Collapse,
  CollapsePanelProps,
  Space,
  Descriptions,
} from 'antd'
import { ReactChildrenProps } from '@src/types/types'
import type { Vector3 } from '@react-three/fiber'
import { forMatVector3 } from '@src/utils/format'

const { Panel } = Collapse
const { Text } = Typography

export type MyThreeCtrlMenuProps = {
  defaultOpenKeys: string[]
  panels: (CollapsePanelProps & ReactChildrenProps)[]
}

export const MyThreeCtrlMenu = ({ defaultOpenKeys, panels }: MyThreeCtrlMenuProps) => {
  return (
    <Collapse defaultActiveKey={defaultOpenKeys}>
      {panels.map((props) => {
        return <Panel {...props}></Panel>
      })}
    </Collapse>
  )
}

export const XyzInfoRow = ({ arr, label }: { label: string; arr: Vector3 }) => {
  const data = forMatVector3(arr)

  return (
    <Row>
      <Col>
        <Space>
          <Descriptions title={null}>
            <Descriptions.Item label={label}>{`x: ${data[0].toFixed(2)},y: ${data[1].toFixed(
              2
            )}, z: ${data[2].toFixed(2)}`}</Descriptions.Item>
          </Descriptions>
        </Space>
      </Col>
    </Row>
  )
}

export const XyzForm = ({
  onUpdate,
  btnText,
}: {
  onUpdate: (x: number, y: number, z: number) => void
  btnText: string
}) => {
  const [rot, setRot] = useState({ x: 0, y: 0, z: 0 })
  return (
    <>
      <Row>
        <Row>
          <Col span={24}>
            <InputNumber
              value={rot.x}
              onChange={(v) => {
                setRot({ ...rot, x: v })
              }}
              addonBefore="x"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <InputNumber
              value={rot.y}
              onChange={(v) => {
                setRot({ ...rot, y: v })
              }}
              addonBefore="y"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <InputNumber
              value={rot.z}
              onChange={(v) => {
                setRot({ ...rot, z: v })
              }}
              addonBefore="z"
            />
          </Col>
        </Row>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              const { x, y, z } = rot
              onUpdate(x, y, z)
            }}>
            {btnText}
          </Button>
        </Col>
      </Row>
    </>
  )
}
