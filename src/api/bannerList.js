import Axios from 'axios'

// eslint-disable-next-line no-unused-vars
const getBannerList = params => {
  return Axios.get('https://m.maizuo.com/gateway', {
    params,
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1575095471541165882348","bc":"440300"}',
      'X-Host': 'mall.cfg.common-banner'
    }
  })
}
// 普通暴露，可以在引用的时候使用结构赋值
export {
  getBannerList
}
