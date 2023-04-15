import { configureStore } from '@reduxjs/toolkit'
import rotateBoxSceneReducer from '@containers/arts/scenes3d/rotateBox/rotateBoxSlice'
import { RotateBoxSceneState } from './rotateBoxScene/types'
import { Pcd1SceneState } from './pcd1Scene/types'
import pcd1SceneReducer from '@containers/arts/scenes3d/pcd1/pcd1Slice'
export interface RootState {
  rotateBoxScene: RotateBoxSceneState
  pcd1Scene: Pcd1SceneState
}

export const store = configureStore({
  reducer: {
    rotateBoxScene: rotateBoxSceneReducer,
    pcd1Scene: pcd1SceneReducer,
  },
})

export default store
