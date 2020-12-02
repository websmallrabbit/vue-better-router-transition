import service from './request'

export const fetchApi = (url = '', data = {}, type = 'POST', message = 'noMessage', isLoading = 'Y', responseType = '', timeOut = 'N') => {
  // axios.defaults.withCredentials = true
  type = type.toUpperCase()
  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[ key ] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + encodeURI(dataStr)
    }
  }
  // if (url.indexOf('?') < 0) {
  //   url = encodeURI(url)
  // }
  return service({
    method: type,
    // baseURL: process.env.NODE_ENV,
    url: url,
    data: data,
    message: message,
    isLoading: isLoading,
    responseType: responseType,
    timeOut: timeOut
  })
}
