import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pcd1SceneState } from '@src/store/pcd1Scene/types'

const initialState: Pcd1SceneState = {
  orbitCtrlStatus: {
    enabled: true,
    rotateSpeed: 0.5,
  },
  tfCtrlStatus: {
    enabled: true,
  },
  octreeHelperStatus: {
    enabled: true,
  },
  meshStatus: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [3, 3, 3],
  },
  helperCamStatus: {
    enabled: true,
    position: [10, 0, 0],
    LookAt: [0, 0, 0],
    near: 0,
    far: 50,
  },
}

type OrbitCtrlStatusType = Pcd1SceneState['orbitCtrlStatus']
type TfCtrlStatusType = Pcd1SceneState['tfCtrlStatus']
type OctreeHelperStatusType = Pcd1SceneState['octreeHelperStatus']
type MeshStatusType = Pcd1SceneState['meshStatus']
type HelperCamStatusType = Pcd1SceneState['helperCamStatus']

export const pcd1Slice = createSlice({
  name: 'pcd1',
  initialState,
  reducers: {
    updateOrbitCtrlStatus: (state, action: PayloadAction<OrbitCtrlStatusType>) => {
      state.orbitCtrlStatus = action.payload
    },
    updateTfCtrlStatus: (state, action: PayloadAction<TfCtrlStatusType>) => {
      state.tfCtrlStatus = action.payload
    },
    updateOctreeHelperStatus: (state, action: PayloadAction<OctreeHelperStatusType>) => {
      state.octreeHelperStatus = action.payload
    },
    updateMeshStatus: (state, action: PayloadAction<MeshStatusType>) => {
      state.meshStatus = action.payload
    },
    updateHelperCamStatus: (state, action: PayloadAction<HelperCamStatusType>) => {
      state.helperCamStatus = action.payload
    },
  },
})

export const {
  updateOrbitCtrlStatus,
  updateTfCtrlStatus,
  updateOctreeHelperStatus,
  updateMeshStatus,
  updateHelperCamStatus,
} = pcd1Slice.actions

export default pcd1Slice.reducer
