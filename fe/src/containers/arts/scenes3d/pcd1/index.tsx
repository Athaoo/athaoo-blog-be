import React, { useEffect, useRef, useState } from 'react'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
// import { PCDLoader } from 'three-stdlib'
import { OrbitControls, PerspectiveCamera, useHelper, TransformControls } from '@react-three/drei'
import { Group, PointsMaterial } from 'three'

import { RootState } from '@src/store'

import { Card, Col, Row } from 'antd'

// import pcdFile from '@src/assets/pcd/test1.pcd'
import BaseAmbientPointLight from '@src/components/three/base/light'

// const PointCloud = () => {
//   const pcdRef = React.useRef<Group>()

//   React.useEffect(() => {
//     const loader = new PCDLoader()
//     loader.load(pcdFile, (points) => {
//       const materia = new PointsMaterial({
//         // color: '#00FF00',
//         size: 0.1,
//       })
//       points.material = materia
//       pcdRef.current.add(points)
//     })
//   }, [])

//   return <group ref={pcdRef}></group>
// }

const Pcd = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={90} />
      <BaseAmbientPointLight />
      <OrbitControls />
      {/* <PointCloud /> */}
    </>
  )
}

const Pcd1SceneContainer = () => {
  return (
    <Row>
      <Col span={18}>
        <Card bordered={false} style={{ width: '100%', margin: '0 36px' }}>
          <Card>点云测试</Card>
          <Canvas style={{ height: '600px' }}>
            <Pcd />
          </Canvas>
        </Card>
      </Col>
      <Col span={6}></Col>
    </Row>
  )
}

export default Pcd1SceneContainer
