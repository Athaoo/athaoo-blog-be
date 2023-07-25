export type ReactChildrenProps = {
  children?: React.ReactNode
}

export type ReducerAction<T = string, TP = any> = {
  type: T
  payload: TP
}
