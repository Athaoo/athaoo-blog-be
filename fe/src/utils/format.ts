import { Vector3 } from '@react-three/fiber'
import { XyzArr } from '@src/types/three'
import * as THREE from 'three'

export function forMatVector3(vector: Vector3): XyzArr {
  console.log(`🚀 -> file: format.ts:6 -> forMatVector3 -> vector:`, vector)
  if (typeof vector === 'number') {
    return [vector, vector, vector]
  } else if (vector instanceof THREE.Vector3) {
    return [vector.x, vector.y, vector.z]
  } else if (vector instanceof Array) {
    return [vector[0], vector[1], vector[2]]
  } else {
    return [0, 0, 0]
  }
}
