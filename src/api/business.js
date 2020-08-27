import request from '@/api'

// export const Login = params => request.get('wards/getVirtualWardByWardNameAndFlag?flag=true', params)
// export const Logina = params => request.post('infusionStatistical/getInfusionExecutedStatisticByDateZone', params)

/****
 *自助挂号情况
 * url: loadOfficeTotalTransInfo
 * @param {}
 */
export const Register = params => request.post('deviceBusiness/loadOfficeHistBuzyInfo', params)

/****
 *缴费金额统计
 * url: loadOfficeTotalTransInfo
 * @param {}
 */
export const PaymentAmount = params => request.post('deviceBusiness/loadOfficeHistTransInfo', params)

/****
 *缴费方式占比
 * url: loadOfficeTotalTransInfo
 * @param {}
 */
export const PaymentPay = params => request.post('office/loadOfficeTransTypeRatio', params)