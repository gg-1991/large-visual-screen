import Mock from 'mockjs'

export function mockXHR(options) {
  function XHR2ExpressReqWrap(respond) {
    const _that = this
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, method, url } = options
        result = respond({
          method: method,
          body: JSON.parse(body),
          query: _that.$utils.param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }
  let jsonUrl = options.url
  if(jsonUrl.indexOf('?') >= 0){
    jsonUrl = jsonUrl.split('?')[0]
  }
  jsonUrl = jsonUrl.split('office')[1].split('/').slice(1).join('.')
  const dataJson = require(`./${jsonUrl}.json`)
  Mock.mock(new RegExp(jsonUrl), options.method || 'get', XHR2ExpressReqWrap(dataJson))
}