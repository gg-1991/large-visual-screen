export default {
  login (state, loginInfo) {
    state.loginInfo = loginInfo
    localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
  }
}
