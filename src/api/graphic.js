import request from './index'

/**
 * 4.1.3.查询社区挂号类型比例与参保人比例
 * @param {*} data 
 */
export function loadOfficeRegistrationRatio(data){
  return request({
    url: 'office/loadOfficeRegistrationRatio',
    // url: 'office/loadRegistrationRatio',
    method: 'post',
    data
  })
}

/**
 * 4.1.2.查询社区挂号量TOP
 * @param {*} data 
 */
export function loadOfficeRegistrationTop(data){
  return request({
    url: 'office/loadOfficeRegistrationList',
    method: 'post',
    data
  })
}

/**
 * 查询社区登录类型比重
 * @param {*} data 
 */
export function loadSignInTypeList(data){
  return request({
    url: 'office/loadSignInTypeRatio',
    method: 'post',
    data
  })
}
/**
 * 4.1.5.查询社区交易量TOP
 * @param {*} data 
 */
export function loadOfficeTransList(data){
  return request({
    url: 'office/loadOfficeTransList',
    method: 'post',
    data
  })
}
/**
 * 查询社区交易类型比例与缴费账户类型比例
 * @param {*} data 
 */
export function loadOfficeTransTypeRatio(data){
  return request({
    url: 'office/loadOfficeTransTypeRatio',
    method: 'post',
    data
  })
}
/**
 * 4.1.1.查询全部乡镇/街道缴费分布情况(全市地图)
 * @param {*} data 
 */
export function loadOfficeTotalTransInfo(data){
  return request({
    url: 'office/loadOfficeTotalTransInfo',
    method: 'post',
    data
  })
}
/**
 * 查看乡镇/街道故障率排名
 * @param {*} data 
 */
export function loadOfficeDeviceFaultRatio(data){
  return request({
    url: 'device/loadOfficeDeviceFaultRatio',
    method: 'post',
    data
  })
}
