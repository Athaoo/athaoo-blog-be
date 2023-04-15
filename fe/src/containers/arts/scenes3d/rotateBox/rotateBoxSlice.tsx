import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orbitCtrlEnabled: true,
  tfCtrlEnabled: true,
  camPos: [20, 20, 20],
  helperCamPos: [5, 5, 0],
  meshPos: [0, 0, 0],
  helperCamLookAt: [0, 0, 0],
  meshScale: 1,
}

export const sceneSlice = createSlice({
  name: 'rotateBoxScene',
  initialState,
  reducers: {
    toggleOrbitCtrl: (state) => {
      state.orbitCtrlEnabled = !state.orbitCtrlEnabled
    },
    toggleTfCtrl: (state) => {
      state.tfCtrlEnabled = !state.tfCtrlEnabled
    },
    setCamPos: (state, action) => {
      state.camPos = action.payload
    },
    setHelperCamPos: (state, action) => {
      state.helperCamPos = action.payload
    },
    setMeshPos: (state, action) => {
      state.meshPos = action.payload
    },
    setHelperCamLookAt: (state, action) => {
      state.helperCamLookAt = action.payload
    },
    setMeshScale: (state, action) => {
      state.meshScale = action.payload
    },
  },
})

export const {
  toggleOrbitCtrl,
  toggleTfCtrl,
  setCamPos,
  setHelperCamPos,
  setMeshPos,
  setMeshScale,
} = sceneSlice.actions

export default sceneSlice.reducer
