export const isLogin = () => {
  const token = getToken()
  if (typeof token == 'string' && token.length) return true
  return false
}

export const getToken = () => {
  return window.sessionStorage.getItem('token')
}
