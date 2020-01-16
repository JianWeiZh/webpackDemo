
import md5 from 'js-md5'
// 进行签名校验 生成最终的options
function checkUrl (config) {
  // appKey
  const appKey = 'U2FsdGVkX18YEbHP8DVdNLmkjGBICl7Ixm41a/LemtQ='
  // 进行签名
  var options = {}

  for (let i in config.data) {
    (config.data[i] === null || config.data[i] === undefined) && (config.data[i] = '')
  }

  if (config.method === 'get') { // get请求签名
    options = {
      _appid: 'optimus.m',
      ...config.params,
      _timestamp: Math.floor(new Date().getTime() / 1000)
    }
  } else { // post请求签名
    if (!config.data) {
      options = {
        _appid: 'optimus.m',
        ...config.params,
        _timestamp: Math.floor(new Date().getTime() / 1000)
      }
    } else {
      options = {
        _appid: 'optimus.m',
        _timestamp: Math.floor(new Date().getTime() / 1000)
      }
      if (config.headers['Content-Type'].indexOf('multipart/form-data') === -1) {
        options._body = JSON.stringify(config.data)
      }
    }
  }
  options.hasOwnProperty('_sign') && delete options['_sign']
  // result生成最后签名
  var result = appKey
  var arr = Object.keys(options).sort()
  arr.forEach((val) => {
    if (options[val] !== null && options[val] !== undefined) {
      result += val + options[val]
    } else {
      // console.warn('参数错误：' + val + '-' + options[val])
    }
  })
  // 进行md5加密
  // const sign = crypto.createHash('md5').update(result).digest('hex')
  const sign = md5(result)
  options['_sign'] = sign // 签名
  return options
}

var utilsMethod = {
  get (config) {
    var options = checkUrl(config)
    config.params['_timestamp'] = options['_timestamp']
    config.params['_sign'] = options['_sign']
  },
  post (config) {
    // if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    var options = checkUrl(config)
    config.params['_timestamp'] = options['_timestamp']
    config.params['_sign'] = options['_sign']
    // }
  }
}
export function verifivationUrl (config) {
  utilsMethod[config.method](config)
}
