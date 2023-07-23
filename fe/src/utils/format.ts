import { Vector3 as RTFV3 } from '@react-three/fiber'
import { XyzArr } from '@src/types/three'
import { Vector3 as THREEVecter3 } from 'three'

export function forMatVector3(vector: RTFV3): XyzArr {
  if (typeof vector === 'number') {
    return [vector, vector, vector]
  } else if (vector instanceof THREEVecter3) {
    return [vector.x, vector.y, vector.z]
  } else if (vector instanceof Array) {
    return [vector[0], vector[1], vector[2]]
  } else {
    return [0, 0, 0]
  }
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('zh-CN')
}
