import Axios from 'axios'
const getDetailsApi = params => {
    return Axios.get('https://m.maizuo.com/gateway', {
      params,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16250383653779459551330305"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    })
  }

  export {
    getDetailsApi,
  }
  