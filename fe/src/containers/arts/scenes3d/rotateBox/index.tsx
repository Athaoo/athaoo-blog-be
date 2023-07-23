/**
 * 用redux实现状态管理旋转盒子场景
 * 状态设计的比较混乱，菜单中的info和表单等数据流比较乱
 * 主要体现在orbitCtrl更新cam的position时一方面更新了cam内部的position
 * 另一方面还要更新position数据，代码比较冗余，读起来费解
 * 场景包含: 主相机、用来显示视锥体的helper相机、一个Mesh、光源
 */

import React, { useRef, useState, useEffect, forwardRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleOrbitCtrl,
  toggleTfCtrl,
  setCamPos,
  setHelperCamPos,
  setMeshPos,
  setMeshScale,
} from './rotateBoxSlice'
import { RootState } from '@src/store'
import { Canvas, PerspectiveCameraProps, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei'
import { Card, Switch, Button, Row, Col, Typography, Space, Divider } from 'antd'

import TransformControls from '@src/components/three/transformControl'
import { CameraHelper, Vector3 } from 'three'
import { XyzArr } from '@src/types/three'

import {
  XyzInfoRow,
  XyzForm,
  MyThreeCtrlMenu,
  MyThreeCtrlMenuProps,
} from '@src/components/three/menu'
import type { PerspectiveCamera as PerspectiveCameraType } from 'three'

const Lights = () => {
  const pointLightRef = useRef()

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={pointLightRef} position={[10, 10, 10]} />
    </>
  )
}

const ExBox = (props) => {
  const mesh = useRef<THREE.Mesh>()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
    mesh.current.rotation.z += delta
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(ev) => setActive(!active)}
      onPointerOver={(ev) => setHover(true)}
      onPointerOut={(ev) => setHover(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const { Text } = Typography

const MainCam = forwardRef((props: PerspectiveCameraProps, ref) => {
  return <PerspectiveCamera ref={ref} makeDefault {...props} />
})

const HelperCam = React.forwardRef(
  (props: PerspectiveCameraProps, ref: React.MutableRefObject<PerspectiveCameraType>) => {
    useHelper(ref, CameraHelper)

    useEffect(() => {
      ref.current.lookAt(0, 0, 0)
    }, [ref])
    return <PerspectiveCamera ref={ref} makeDefault {...props} />
  }
)

type RotateSceneProps = {
  orbitCtrlEnabled: boolean
  tfCtrlEnabled: boolean
  camPos: XyzArr
  helperCamPos: XyzArr
  meshPos: XyzArr
  meshScale: number
  onMainCamUpdate: (xyzArr) => void
}
const Scene: React.FC<RotateSceneProps> = ({
  orbitCtrlEnabled,
  tfCtrlEnabled,
  camPos,
  meshPos,
  helperCamPos,
  meshScale,
  onMainCamUpdate,
}) => {
  const mainCamRef = useRef<PerspectiveCameraType>()
  const helperCamRef = useRef<PerspectiveCameraType>()
  const up = new Vector3(0, 0, 1)

  return (
    <Canvas>
      <Lights />
      <HelperCam ref={helperCamRef} position={helperCamPos} near={2} far={15} fov={25} />
      <MainCam ref={mainCamRef} position={camPos} up={up} />
      <OrbitControls
        camera={mainCamRef.current}
        enabled={orbitCtrlEnabled}
        rotateSpeed={0.3}
        onEnd={(e) => {
          const { position } = mainCamRef.current
          onMainCamUpdate([position.x, position.y, position.z])
        }}
      />
      <TransformControls enabled={tfCtrlEnabled}>
        <ExBox position={meshPos} />
      </TransformControls>
    </Canvas>
  )
}

const ControllerSwitcher = ({ onOrbitSwitchChange, onTfCtrlSwitchChange }) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Space>
            <Text>switch orbit Control</Text>
            <Switch
              defaultChecked
              onChange={(val) => {
                onOrbitSwitchChange(val)
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
              defaultChecked
              onChange={(val) => {
                onTfCtrlSwitchChange(val)
              }}
            />
          </Space>
        </Col>
      </Row>
    </>
  )
}

const RotateBoxSceneContainer = () => {
  const dispatch = useDispatch()

  const orbitCtrlEnabled = useSelector((s: RootState) => s.rotateBoxScene.orbitCtrlEnabled)
  const tfCtrlEnabled = useSelector((s: RootState) => s.rotateBoxScene.tfCtrlEnabled)
  const camPos = useSelector((s: RootState) => s.rotateBoxScene.camPos)
  const helperCamPos = useSelector((s: RootState) => s.rotateBoxScene.helperCamPos)
  const meshPos = useSelector((s: RootState) => s.rotateBoxScene.meshPos)
  const meshScale = useSelector((s: RootState) => s.rotateBoxScene.meshScale)

  const onMainCamPosChange = (newPos) => {
    dispatch(setCamPos(newPos))
  }

  const onHelperCamPosChange = (newPos) => {
    dispatch(setHelperCamPos(newPos))
  }

  const onMeshPosChange = (newPos) => {
    dispatch(setMeshPos(newPos))
  }

  const onMeshScaleChange = (newScale) => {
    dispatch(setMeshScale(newScale))
  }

  const handleToggleOrbitCtrl = () => {
    dispatch(toggleOrbitCtrl())
  }

  const handleToggleTfCtrl = () => {
    dispatch(toggleTfCtrl())
  }

  const menuPanelsProps: MyThreeCtrlMenuProps = {
    defaultOpenKeys: ['baseInfo', 'mainCamPos', 'helperCamPos', 'controls'],
    panels: [
      {
        key: 'controls',
        header: 'controls',
        children: (
          <ControllerSwitcher
            onOrbitSwitchChange={(v) => {
              handleToggleOrbitCtrl()
            }}
            onTfCtrlSwitchChange={(v) => {
              handleToggleTfCtrl()
            }}
          />
        ),
      },
      {
        key: 'baseInfo',
        header: 'baseInfo',
        children: (
          <>
            <XyzInfoRow arr={camPos} label={'Main cam position'} />
            <XyzInfoRow arr={helperCamPos} label={'Helper cam position'} />
            <Row>
              <Col>
                <Button
                  type={'primary'}
                  onClick={() => {
                    onMainCamPosChange([20, 20, 20])
                  }}>
                  {'reset main cam pos'}
                </Button>
              </Col>
              <Col>
                <Button
                  type={'primary'}
                  onClick={() => {
                    onHelperCamPosChange([5, 5, 0])
                  }}>
                  {'reset helper cam pos'}
                </Button>
              </Col>
            </Row>
          </>
        ),
      },
      {
        key: 'cubePos',
        header: 'cube position',
        children: (
          <XyzForm
            btnText={'update cube position'}
            onUpdate={(x, y, z) => {
              onMeshPosChange([x, y, z])
            }}
          />
        ),
      },
      {
        key: 'cubeScale',
        header: 'cube scale',
        children: (
          <XyzForm
            btnText={'update cube Scale'}
            onUpdate={(x, y, z) => {
              onMeshScaleChange(x)
            }}
          />
        ),
      },
      {
        key: 'mainCamPos',
        header: 'main cam position',
        children: (
          <XyzForm
            btnText={'update cam position'}
            onUpdate={(x, y, z) => {
              onMainCamPosChange([x, y, z])
            }}
          />
        ),
      },
      {
        key: 'helperCamPos',
        header: 'helper cam position',
        children: (
          <XyzForm
            btnText={'update helper cam position'}
            onUpdate={(x, y, z) => {
              onHelperCamPosChange([x, y, z])
            }}
          />
        ),
      },
    ],
  }

  return (
    <Row>
      <Col span={16} style={{ padding: '0 24px' }}>
        <Card style={{ width: '100%' }} bodyStyle={{ padding: '0' }}>
          <div style={{ width: '100%', height: '600px' }}>
            <Scene
              orbitCtrlEnabled={orbitCtrlEnabled}
              tfCtrlEnabled={tfCtrlEnabled}
              camPos={camPos}
              helperCamPos={helperCamPos}
              meshPos={meshPos}
              meshScale={meshScale}
              onMainCamUpdate={onMainCamPosChange}
            />
          </div>
        </Card>
      </Col>
      <Col span={8} style={{ padding: '0 24px' }}>
        <Card style={{ height: '600px', overflow: 'auto' }}>
          <MyThreeCtrlMenu {...menuPanelsProps} />
        </Card>
      </Col>
    </Row>
  )
}

export default RotateBoxSceneContainer
