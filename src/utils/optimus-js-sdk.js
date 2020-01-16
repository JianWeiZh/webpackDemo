const bridge = {
  default: this,
  call: function (method, args, cb) {
    var ret = ''
    if (typeof args === 'function') {
      cb = args
      args = {}
    }
    var arg = { data: args === undefined ? null : args }
    if (typeof cb === 'function') {
      var cbName = 'dscb' + window.dscb++
      window[cbName] = cb
      arg['_dscbstub'] = cbName
    }
    arg = JSON.stringify(arg)

    // if in webview that dsBridge provided, call!
    if (window._dsbridge) {
      ret = window._dsbridge.call(method, arg)
    } else if (window._dswk || navigator.userAgent.indexOf('_dsbridge') !== -1) {
      ret = prompt('_dsbridge=' + method, arg)
    }

    return JSON.parse(ret || '{}').data
  },
  register: function (name, fun, asyn) {
    var q = asyn ? window._dsaf : window._dsf
    if (!window._dsInit) {
      window._dsInit = true
      // notify native that js apis register successfully on next event loop
      setTimeout(function () {
        bridge.call('_dsb.dsinit')
      }, 0)
    }
    if (typeof fun === 'object') {
      q._obs[name] = fun
    } else {
      q[name] = fun
    }
  },
  registerAsyn: function (name, fun) {
    this.register(name, fun, true)
  },
  hasNativeMethod: function (name, type) {
    return this.call('_dsb.hasNativeMethod', { name: name, type: type || 'all' })
  },
  disableJavascriptDialogBlock: function (disable) {
    this.call('_dsb.disableJavascriptDialogBlock', {
      disable: disable !== false
    })
  }
};

(function () {
  if (window._dsf) return
  var ob = {
    _dsf: {
      _obs: {}
    },
    _dsaf: {
      _obs: {}
    },
    dscb: 0,
    dsBridge: bridge,
    close: function () {
      bridge.call('_dsb.closePage')
    },
    _handleMessageFromNative: function (info) {
      var arg = JSON.parse(info.data)
      var ret = {
        id: info.callbackId,
        complete: true
      }
      var f = this._dsf[info.method]
      var af = this._dsaf[info.method]
      var callSyn = function (f, ob) {
        ret.data = f.apply(ob, arg)
        bridge.call('_dsb.returnValue', ret)
      }
      var callAsyn = function (f, ob) {
        arg.push(function (data, complete) {
          ret.data = data
          ret.complete = complete !== false
          bridge.call('_dsb.returnValue', ret)
        })
        f.apply(ob, arg)
      }
      if (f) {
        callSyn(f, this._dsf)
      } else if (af) {
        callAsyn(af, this._dsaf)
      } else {
        // with namespace
        var name = info.method.split('.')
        if (name.length < 2) return
        var method = name.pop()
        var namespace = name.join('.')
        var obs = this._dsf._obs
        var ob = obs[namespace] || {}
        var m = ob[method]
        if (m && typeof m === 'function') {
          callSyn(m, ob)
          return
        }
        obs = this._dsaf._obs
        ob = obs[namespace] || {}
        m = ob[method]
        if (m && typeof m === 'function') {
          callAsyn(m, ob)
        }
      }
    }
  }
  for (var attr in ob) {
    window[attr] = ob[attr]
  }
  bridge.register('_hasJavascriptMethod', function (method, tag) {
    var name = method.split('.')
    if (name.length < 2) {
      return !!(window._dsf[name] || window._dsaf[name])
    } else {
      // with namespace
      method = name.pop()
      var namespace = name.join('.')
      var ob = window._dsf._obs[namespace] || window._dsaf._obs[namespace]
      return ob && !!ob[method]
    }
  })
}())

const dsBridge = bridge

const invokeDsBridge = (name, params = {}) => {
  if (!dsBridge) {
    alert('no supported')
  } else {
    return dsBridge.call(name, params, (res) => {
      if (params.success && typeof params.success === 'function') {
        res = JSON.parse(res)
        return params.success(res)
      }
    })
  }
}

export default {
  /**
   * 分享
   * @param params
   * @return {undefined}
   */
  share: (params) => {
    return invokeDsBridge('share', params)
  },
  /**
   * 关闭webview
   * @param params
   * @return {undefined}
   */
  close: (params) => {
    return invokeDsBridge('close', params)
  },
  /**
   * 拨打电话
   * @param params
   * @return {undefined}
   */
  telephone: (params) => {
    return invokeDsBridge('telephone', params)
  },
  /**
   * 唤起原生登录
   * @param params
   * @return {undefined}
   */
  login: (params) => {
    return invokeDsBridge('login', params)
  },
  /**
   * 唤起地图导航
   * @param params
   * @return {undefined}
   */
  mapNavi: (params) => {
    return invokeDsBridge('mapNavi', params)
  },
  /**
   * 支付成功调用 通知原生
   * @param params
   * @return {undefined}
   */
  paySuccess: (params) => {
    return invokeDsBridge('paySuccess', params)
  },
  /**
   * 获取app版本信息
   * @param params
   * @return {undefined}
   */
  getAppVersion: (params) => {
    return invokeDsBridge('getAppVersion', params)
  },
  /**
   * 打开原生页面或新的webview 可控制原生头显示类型
   * @param params
   * @return {undefined}
   */
  newAction: (params) => {
    return invokeDsBridge('newAction', params)
  },
  /**
   * 校验相册权限
   * @param params
   * @return {undefined}
   */
  isHaveCameraPermission: (params) => {
    return invokeDsBridge('isHaveCameraPermission', params)
  },
  wxNativePay: (params) => {
    return invokeDsBridge('wxNativePay', params)
  }
}
