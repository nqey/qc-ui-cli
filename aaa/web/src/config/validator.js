/* eslint-disable */
import rules from '@/config/rules';

const _VALIDATOR_FLAG_ = '__validator__';
const _VALIDATE_FAILED_FLAG_ = '__invalidate__';

const setMessager = (element, pass, notice) => {
  let messager = element.nextSibling;
  // 如果存在messager，那么删除messager
  if (messager && messager.className && messager.className.indexOf(_VALIDATOR_FLAG_) > -1) {
    messager.remove();
  }

  // 通过了，且没有正确提示。
  if (pass && element.hasAttribute('no-validate-pass-tip')) {
    return ;
  }

  // 初始化messager相关属性
  notice = element.getAttribute('notice') || notice;
  let color = pass ? 'green' : 'red';
  let kls = pass ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove';

  // 新建一个提示的node
  const newItem = document.createElement('span');
  newItem.className = `${_VALIDATOR_FLAG_} ${kls}`;
  newItem.style.color = color;
  newItem.style['position'] = 'absolute';
  newItem.style['right'] = '60px';
  const textnode = document.createTextNode(pass ? '' : notice);
  newItem.appendChild(textnode);

  // 插入到element的后面
  const parent = element.parentNode;
  if (parent.lastChild === element) {
    parent.appendChild(newItem);
  } else {
    parent.insertBefore(newItem, element.nextSibling);
  }
}


/**
 * 取target相对于屏幕的顶端的距离
 * @param target
 */
const offsetTop = (target) => {
  if (!target) {
    return 0;
  }

  let t = target;
  let offset = t.offsetTop;
  while (t.offsetParent) {
    t = t.offsetParent;
    offset += t.offsetTop;
  }
  return offset;
}
/**
 * 滚到target所在位置，让target处在屏幕中间， 目前只考虑了y轴
 * @param target ： 元素
 * @returns {*}
 */
const scrollToDom = (target) => {
  window.scrollTo(0, offsetTop(target) - document.body.clientHeight / 2);
};

const doValidate = (element, value) => {
  // 删除本身验证不通过的标识
  element.className = element.className.replace(_VALIDATE_FAILED_FLAG_, '').trim();

  // 挨个规则验证
  let pass = true;
  let has = false;
  let notice = null;
  for (let key in rules) {
    const rule = rules[key];
    if (element.hasAttribute(`${key}`)) {
      has = true;
      element.style.display = 'inline';
      pass = rule.validator(element, value);
      notice = rule.message(element, value);
      if (!pass) {
        element.className += ` ${_VALIDATE_FAILED_FLAG_}`;
        break;
      }
    }
  }

  if (has) {
    setMessager(element, pass, notice);
  }
  return true;
};

const VALIDATE_ROUTER = {
  decisior(dom) {
    const f = VALIDATE_ROUTER[dom.tagName.toUpperCase()];
    if (f) {
      f(dom);
    }
  },
  //input 为text的输入框
  INPUT(dom) {
    doValidate(dom, dom.value);
  },
  SELECT(dom) {
    doValidate(dom, dom.value);
  },
  TEXTAREA(dom) {
    doValidate(dom, dom.value);
  },
}

let inited = false;
(() => {
  // 只初始化一次
  if (inited) {
    return;
  }
  inited = true;

  // 给input、textarea类型绑定blur事件
  document.addEventListener('blur', (e) => VALIDATE_ROUTER.decisior(e.target), true);

  // 给select类型绑定change事件
  document.addEventListener('change', (e) => VALIDATE_ROUTER.decisior(e.target), true);

  // radio box

  // checkbox

})();

// 切面使用, 一定不能改成箭头函数，不然this失效
Function.prototype.before = function(beforefn) {
  var __self = this;
  return function() {
    const result = beforefn.apply(this, arguments);
    if (result) {
      // 返回true继续执行
      return __self.apply(this, arguments);
    } else {
      // 返回false什么都不执行
      return () => {
      };
    }
  };
};


// 外部标签初始化函数
export const validate = function() {
  return function(target, key, descriptor) {
    // 修改原的方法调用
    descriptor.value = descriptor.value.before(function() {
      // 在提交之前验证
      const parent = this.$el;
      // 是否存在验证未通过的
      let invalidated = parent.getElementsByClassName(_VALIDATE_FAILED_FLAG_);
      if (invalidated.length > 0) {
        scrollToDom(invalidated[0]);
        return false;
      }

      // 包含rules中的属性，如required 应该打上 val-required 标签
      [...parent.querySelectorAll(Object.keys(rules).map(k => `[${k}]`).join(','))]
        .forEach(dom => {
          // 根据dom的tagName来定位到那条验证规则。
          VALIDATE_ROUTER.decisior(dom);
        })

      // 是否存在验证未通过的
      invalidated = parent.getElementsByClassName(_VALIDATE_FAILED_FLAG_);
      if (invalidated.length > 0) {
        scrollToDom(invalidated[0]);
        return false;
      }
      return true;
    });
  };
};

/**
 * 使用方法，在需要使用的页面引入：
 * 1， import { validate } from '@/config/validator';
 *
 * 2， 在需要在验证的提交方法上加@validate()；
 *    如：
 *    @validate()
 *    methods(){
 *      //do something；
 *    }
 *    一个页面只需要引入一次即可；
 * 3， 在需要验证的标签上打上标签
 *  val-required: 必填
 *  val-email:email
 *  val-max-length={x} ： 最大长度不能大于x
 *  val-min-length={y} :  最小长度不能小于y
 *  val-url ： http/https url
 *  val-cellphone : 是否是手机号码
 *  val-password : 必须包含字母、数字、长度在6-20位
 *  val-id-card : 身份证
 *  val-time : 时间格式
 *
 * 4，如果打上message="{z}"标签，那么输入错误的时候，将提示z;
 *
 * 5，自定义验证器
 *   打上标签 val-custom='func' func是当前页面下的一个method
 *   TODO: ---待实现
 */
