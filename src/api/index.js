import axios from 'axios'
import store from '@/store'
const config = require('../../config')
import router from '@/router'
import { Message } from 'element-ui'
/*const { mockXHR } = process.env.NODE_ENV === 'development' ? require('../mock') : { mockXHR: null }*/
const request = axios.create({
  // url = base url + request url
  baseURL: config['BASE_API'],
  // baseURL: '',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// 发送请求params每个字段限制的最大长度
const MAX_PARAMS_LEN = 128

// 拦截器 请求前
request.interceptors.request.use((config) => {
  // config.headers['reqTm'] = moment().format('YYYYMMDD')
  // config.cancelToken
  //  判断是否是MOCK模式
   /*if(process.env.NODE_ENV === 'development' && mockXHR){
     mockXHR(config)
   }*/
  return config
}, err => Promise.reject(err))
// 响应拦截
request.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // return response;
    return Promise.resolve(response.data)
  },
  function(error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      Message({
        message: '未登录或系统权限不够',
        type: 'error',
        duration: 5000
      })

      router.replace({
        path: '/404'
      })
      return Promise.reject({
        code: '0',
        message: '未登录或系统权限不够'
      })
    } else if (error.response && error.response.status === 500) {
      Message({
        message: '系统后台错误',
        type: 'error',
        duration: 5000
      })
      return Promise.reject({
        code: '0',
        message: '系统后台错误'
      })
    } else if (error.response && error.response.status === 413) {
      Message({
        message: '查询条件输入过多',
        type: 'error',
        duration: 5000
      })
      return Promise.reject({
        code: '0',
        message: '查询条件输入过多'
      })
    } else {
      Message({
        message: '网络请求错误',
        type: 'error',
        duration: 5000
      })
      return Promise.reject({
        code: '0',
        message: '网络请求错误'
      })
    }
  }
)
export default request