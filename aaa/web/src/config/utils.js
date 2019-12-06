/* eslint-disable */

/**
 * @param data
 * @returns {array|object|null|undefined|function|error|regexp|number|string|boolean}
 */
export const type = (data) => {
  const t = typeof data;

  switch (typeof data) {
    case 'object':
      if (data === null) {
        return 'null';
      } else if (data instanceof Array) {
        return 'array';
      } else if (data instanceof RegExp) {
        return 'regexp';
      } else if (data instanceof Error) {
        return 'error';
      }
      return t;
    default:
      return t;
  }
};

/**
 * 示例：
 * {a:1,b:[1,2,3]}  => a=1&b=1&b=2&b=3
 * {a:{b:1,c:[1,2]}} => a.b=1&a.c=1&a.c=2
 * {a:{b:1,c:[{d:1},{d:2},{e:3}]}} => a.b=1&a.c.d=1&a.c.d=2&a.c.e=3
 * {a:{b:{d:{e:[{f:{g:1}},{f:{g:2}}]}},c:[1,2]}} => a.b.d.e.f.g=1&a.b.d.e.f.g=2&a.c=1&a.c=2
 * toQueryString([1,2,3,4], 'c') => c=1&c=2&c=3&c=4
 *
 * 将忽略值是null|undefined|function|error|regexp类型的数据
 * @param data
 * @param prefix 参数名前缀
 * @returns {*}
 */
export const toQueryString = (data, prefix) => {
  prefix = prefix || '';
  const queryString = [];
  switch (type(data)) {
    // []类型
    case 'array':
      if (prefix === '') {
        return '';
      }
      data.forEach((s) => {
        const d = toQueryString(s, prefix);
        if (d !== null && d !== undefined) {
          queryString.push(d);
        }
      });
      break;
    // {}类型
    case 'object':
      Object.entries(data)
        .forEach((s) => {
          let key = s[0];
          const value = s[1];
          if (prefix !== '') {
            key = `${prefix}.${key}`;
          }
          const d = toQueryString(value, key);
          if (d !== null && d !== undefined) {
            queryString.push(d);
          }
        });
      break;
    case 'string':
    case 'boolean':
    case 'number':
      if (prefix === '') {
        return '';
      }
      return `${prefix}=${encodeURIComponent(data)}`;
    // 其他类型忽略
    default:
      return '';
  }
  return queryString.join('&');
};

/**
 * 删除对象-属性值是null|undefined|function|error|regexp类型的数据
 * 只删除第一层数据，不递归删除；
 *
 * @param params {array|object|string}
 * @returns {Array|Object|String} 返回一个新的和params类型一致的数据
 */
export const removeIllegalParams = (params, removeType) => {
  return remove(params, ['null', 'undefined', 'function', 'error', 'regexp']);
};

/**
 * 删除对象-属性值是 指定 toRemoveType 的数据
 * @param params {array|object|string}
 * @param toRemoveType {null|undefined|function|error|regexp}
 * @returns {Array|Object|String} 返回一个新的和params类型一致的数据
 */
export const remove = (params, toRemoveType) => {
  const t = type(params);
  if (t === 'object') {
    const localParams = {};
    Object.keys(params || ({})).forEach((v) => {
      if (toRemoveType.indexOf(type(params[v])) === -1) {
        localParams[v] = params[v];
      }
    });
    return localParams;
  } else if (t === 'array') {
    return params.filter(s => toRemoveType.indexOf(type(s)) === -1);
  }
  return params;
};

/**
 * 移除params里面的 空，null，undefined的数据
 * @param params
 * @param toRemoveType
 * @returns {*}
 */
export const reomveBlank = (params) => {
  const toRemoveType = ['null', 'undefined', 'function', 'error', 'regexp'];
  const t = type(params);
  if (t === 'object') {
    const localParams = {};
    Object.keys(params || ({})).forEach((v) => {
      if (toRemoveType.indexOf(type(params[v])) === -1 && `${params[v]}`.trim() !== '') {
        localParams[v] = params[v];
      }
    });
    return localParams;
  } else if (t === 'array') {
    return params.filter(s => toRemoveType.indexOf(type(s)) === -1 && `${s}`.trim() !== '');
  }
  return params;
}

export const padLeftZero = str => `00${str}`.substr(str.length);

/**
 * 将时间格式化为字符串。
 * @param date ： 可以是Date对象也可以是timestamp
 * @param fmt ： 格式化之后的样式，默认： yyyy-MM-dd hh:mm:ss
 * @returns {string}
 */
export const formatDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof date === 'number') {
    date = new Date(date);
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  Object.keys(o)
    .forEach((k) => {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = `${o[k]}`;
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
      }
    });
  return fmt;
};

/**
 * 下载文件
 * @param
  content: 指定下载地址
 filename: 指定下载文件名
 */
export const download = (content, filename) => {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  eleLink.href = content;
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

/**
 * bIsPcOrPhone
 * return
  true: pc
  false: phone
 */
export const bIsPcOrPhone = () => {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  const bIsMidp = sUserAgent.match(/midp/i) == "midp";
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  const bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  const bIsAndroid = sUserAgent.match(/android/i) == "android";
  const bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  const bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  return !(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
}

/**
 * 全屏
 */
export const fullScreen = (el) => {
  const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;    
  if(typeof rfs != "undefined" && rfs) {
    rfs.call(el);
  };
  return;
}
/**
 * 退出全屏
 */
export const exitScreen = () => {
  if (document.exitFullscreen) {  
    document.exitFullscreen();  
  }  
  else if (document.mozCancelFullScreen) {  
    document.mozCancelFullScreen();  
  }  
  else if (document.webkitCancelFullScreen) {  
    document.webkitCancelFullScreen();  
  }  
  else if (document.msExitFullscreen) {  
    document.msExitFullscreen();  
  } 
  if(typeof cfs != "undefined" && cfs) {
    cfs.call(el);
  }
}

/**
 * 跳转至成功页面
 * @param opts ：{
          message: '操作成功！', // 提示语句，可以为空
          buttons: [{ //操作按钮
            text: '返回',
            link: '/role/list', // 要去的页面
          }],
        }
 */
export const transfer = function(opts = {}) {
  opts = opts || {};
  // 跳转到操作成功页面
  this.$router.push(`/transfer/${encodeURIComponent(JSON.stringify(opts))}`);
};

/**
 * 对象深刻隆
 * @param opts ：{}
 */
export const clone = opts => JSON.parse(JSON.stringify(opts || {}));

/**
 * 自动补全位数
 * @param num 数字
 * @param length 位数
 */
export const prefixInteger = (num, length = 2) =>  (Array(length).join('0') + num).slice(-length)

/**
 * 获取数组长度
 * @param array
 */
export const getArrLen = (o) => (o || []).length

/**
 * 获取数组长
 * @param array
 */
export const getArr = (o) => (o || [])

/**
 * 移动端上下左右执行事件
 * 列子： touch({
      left2right: this.preIndex,
      right2left: this.nextIndex
    })
 */
export const touch = (fns = {
  left2right: () => {},
  right2left: () => {},
  top2bottom: () => {},
  bottom2top: () => {}
}) => {
  let startX
  let startY
  let endX
  let endY
  let X
  let Y
  let flag = true
  const cancelable = (e) => {
    // 判断默认行为是否可以被禁用
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
        // e.preventDefault()
      }
    }
  }

  const runFn = (fnnm) => {
    if (flag) {
      flag = false
      fns[fnnm] && fns[fnnm]()
    }
  }

  document.body.addEventListener('touchstart', (e) => {
    cancelable(e)
    startX = e.changedTouches[0].pageX
    startY = e.changedTouches[0].pageY
  }, false)

  document.body.addEventListener('touchmove', (e) => {
    cancelable(e)
    endX = e.changedTouches[0].pageX
    endY = e.changedTouches[0].pageY
    X = endX - startX
    Y = endY - startY
    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      // 左到右
      runFn('left2right')
    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      // 右到左
      runFn('right2left')
    } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
      // 上到下
      runFn('top2bottom')
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      // 下到上
      runFn('bottom2top')
    }
  }, false)

  document.body.addEventListener('touchend', (e) => {
    cancelable(e)
    flag = true
  }, false)
}
