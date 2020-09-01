import request from '@/api'

// export const Login = params => request.get('wards/getVirtualWardByWardNameAndFlag?flag=true', params)
// export const Logina = params => request.post('infusionStatistical/getInfusionExecutedStatisticByDateZone', params)

/****
 *查询所有终端的运行状态
 * url: /device/loadDeviceRunStatus
 * @param {}
 */
export const RunStatus = params => request.post('device/loadDeviceRunStatus', params)

/****
 *查询所有社区的异常终端
 * url: /device/loadDeviceExceInfo
 * @param {}
 */
export const DeviceExceInfo = params => request.post('device/loadDeviceExceInfo', params)

/****
 *查询所有终端状态详情
 * url: /device/loadDeviceRunStatusInfoList
 * @param {}
 */
export const RunStatusInfoList = params => request.post('device/loadDeviceRunStatusInfoList', params)

/****
 *查看保修单近期的处理情况
 * url: loadMaintenanceOrderDisposeInfo
 * @param {}
 */
export const DisposeInfo = params => request.post('device/loadMaintenanceOrderDisposeInfo', params)

/****
 *查看近期保修单情况
 * url: loadMaintenanceOrderRatio
 * @param {}
 */
export const OrderRatio = params => request.post('device/loadMaintenanceOrderRatio', params)

/****
 *查看保修单提交数量统计
 * url: device/loadMaintenanceOrderCreateCollect
 * @param {}
 */
export const OrderCreateCollect = params => request.post('device/loadMaintenanceOrderCreateCollect', params)