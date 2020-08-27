import request from './index'

/**
 * 4.1.2.查询社区挂号量TOP
 * @param {*} data 
 */
export function loadOfficeRegistrationTop(data){
  return request({
    url: 'office/loadOfficeRegistration',
    method: 'post',
    data
  })
}