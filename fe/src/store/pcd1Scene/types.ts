import { XyzArr } from '@src/types/three'
export interface Pcd1SceneState {
  orbitCtrlStatus: {
    enabled: boolean
    rotateSpeed: number
  }
  tfCtrlStatus: {
    enabled: boolean
  }
  octreeHelperStatus: {
    enabled: boolean
  }
  meshStatus: {
    position: XyzArr
    rotation: XyzArr
    scale: XyzArr
  }
  helperCamStatus: {
    enabled: boolean
    position: XyzArr
    LookAt: XyzArr
    near: number
    far: number
  }
}
