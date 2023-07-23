/**
 * 用自定义hook重构状态管理的旋转盒子场景
 * 场景包含: 主相机、用来显示视锥体的helper相机、一个Mesh、光源
 */

import React, { useRef, useState, useEffect, forwardRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@src/store'
import { Canvas } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import { Card, Switch, Button, Row, Col, Typography, Space, Divider, InputNumber } from 'antd'

import { CameraHelper } from 'three'

import {
  XyzInfoRow,
  XyzForm,
  MyThreeCtrlMenu,
  MyThreeCtrlMenuProps,
} from '@src/components/three/menu'

import { useBasePerspectiveCamera } from '@src/components/three/base/basePerspectiveCam'
import useBaseBox from '@src/components/three/base/baseBox'
import useBaseTransformControls from '@src/components/three/base/baseTransformcontrol'
import { useBaseOrbitCtrols } from '@src/components/three/base/baseOrbitCtrl'

const Light = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, -5, 10]} />
    </>
  )
}

const { Text } = Typography
const ControllerSwitcher = ({
  defaultOrbitEnabled,
  toggleOrbitEnabled,
  defaultTfCtrlEnabled,
  toggleTfCtrlEnabled,
}) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Space>
            <Text>switch orbit Control</Text>
            <Switch
              defaultChecked={defaultOrbitEnabled}
              onChange={(val) => {
                toggleOrbitEnabled()
              }}
            />
          </Space>
        </Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col span={24}>
          <Space>
            <Text>switch transForm Control</Text>
            <Switch
              defaultChecked={defaultTfCtrlEnabled}
              onChange={(val) => {
                toggleTfCtrlEnabled()
              }}
            />
          </Space>
        </Col>
      </Row>
    </>
  )
}

const RotateBox2SceneContainer = () => {
  const baseOrbitCtrl = useBaseOrbitCtrols()
  const basePerCam = useBasePerspectiveCamera({
    initialPosition: [0, 0, 15],
  })
  const helperCam = useBasePerspectiveCamera({
    initialPosition: [10, 0, 0],
    initialNear: 2,
    initialFar: 50,
    initialFov: 40,
  })
  const baseBox = useBaseBox({
    initialPosition: [0, 0, 0],
  })
  const baseTfCtrl = useBaseTransformControls()

  const Scene = () => {
    useHelper(helperCam.cameraRef, CameraHelper)
    return (
      <>
        <Light />
        <helperCam.BasePerspectiveCam />
        <baseOrbitCtrl.OrbitCtrl camera={basePerCam.cameraRef.current} />
        <basePerCam.BasePerspectiveCam />
        <baseTfCtrl.TfCtrl>
          <baseBox.BaseBox>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
          </baseBox.BaseBox>
        </baseTfCtrl.TfCtrl>
      </>
    )
  }

  const menuProps: MyThreeCtrlMenuProps = {
    defaultOpenKeys: ['baseInfo', 'helperCam'],
    panels: [
      {
        key: 'baseInfo',
        header: 'baseInfo',
        children: (
          <>
            <XyzInfoRow label="mesh position" arr={baseBox.position} />
            <XyzInfoRow label="mesh scale" arr={baseBox.scale} />
            <XyzInfoRow label="mesh rotation" arr={baseBox.rotation} />
            <XyzInfoRow label="main cam position" arr={basePerCam.cameraRef?.current?.position} />
            <XyzInfoRow label="helper cam position" arr={helperCam.cameraRef?.current?.position} />
          </>
        ),
      },
      {
        key: 'mesh',
        header: 'update mesh',
        children: (
          <>
            <XyzForm
              onUpdate={(x, y, z) => {
                baseBox.setPosition([x, y, z])
              }}
              btnText={'mesh pos'}></XyzForm>
            <XyzForm
              onUpdate={(x, y, z) => {
                baseBox.setScale([x, y, z])
              }}
              btnText={'mesh pos'}></XyzForm>
            <XyzForm
              onUpdate={(x, y, z) => {
                baseBox.setRotation([x, y, z])
              }}
              btnText={'mesh pos'}></XyzForm>
          </>
        ),
      },
      {
        key: 'mainCam',
        header: 'update main cam',
        children: (
          <XyzForm
            onUpdate={(x, y, z) => {
              basePerCam.setPosition([x, y, z])
            }}
            btnText={'mesh pos'}></XyzForm>
        ),
      },
      {
        key: 'helperCam',
        header: 'update helper cam',
        children: (
          <Row>
            <Col>
              <XyzForm
                onUpdate={(x, y, z) => {
                  basePerCam.setPosition([x, y, z])
                }}
                btnText={'mesh pos'}></XyzForm>
              <Row>
                <Col>
                  <Space>
                    <InputNumber
                      onChange={(v) => basePerCam.setFov(Number(v))}
                      addonBefore={'fov'}></InputNumber>
                    <InputNumber
                      onChange={(v) => basePerCam.setNear(Number(v))}
                      addonBefore={'near'}></InputNumber>
                    <InputNumber
                      onChange={(v) => basePerCam.setFar(Number(v))}
                      addonBefore={'far'}></InputNumber>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        ),
      },
      {
        key: 'controls',
        header: 'controls',
        children: (
          <ControllerSwitcher
            defaultOrbitEnabled={baseOrbitCtrl.enabled}
            defaultTfCtrlEnabled={baseTfCtrl.enabled}
            toggleOrbitEnabled={baseOrbitCtrl.toggleEnabled}
            toggleTfCtrlEnabled={baseTfCtrl.toggleTfEnabled}
          />
        ),
      },
    ],
  }

  return (
    <Row>
      <Col span={18}>
        <div style={{ width: '100%', height: '600px' }}>
          <Canvas>
            <Scene />
          </Canvas>
        </div>
      </Col>
      <Col span={6}>
        <Card>
          <MyThreeCtrlMenu {...menuProps} />
        </Card>
      </Col>
    </Row>
  )
}

export default RotateBox2SceneContainer
