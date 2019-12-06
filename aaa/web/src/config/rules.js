/* eslint-disable */
// 邮箱验证
const emailReg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
// url验证
const urlReg = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
// 手机验证
const cellphoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
// 密码验证
const passwordReg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}');
// 省份证验证
const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// 推送时间验证
const timeReg = /^(([\u4E00-\u9FA5]{4})|(\d{4}-\d{2}-\d{2}[T]\d{2}[:]\d{2}))$/;
// 整数验证
const numberReg = /^\+?[1-9][0-9]*$/;

export default {
  'val-required': {
    validator(el, value) {
      return (value || '').trim().length > 0;
    },
    message: (el) => '此项必填',
  },
  'val-number': {
    validator(el) {
      return numberReg.test(el.value);
    },
    message: (el) => '请输入整数！！！',
  },
  'val-max-length': {
    validator(el, value) {
      const len = (value || '').trim().length;
      const maxLength = +el.getAttribute('val-max-length');
      if (maxLength < 0 || isNaN(maxLength)) {
        throw new Error('val-max-length应该为正整数');
        return true;
      }

      return len <= maxLength;
    },
    message: (el, attr) => `长度不能超过${el.getAttribute('val-max-length')}个字符`,
  },
  'val-min-length': {
    validator(el, b) {
      const len = (value || '').trim().length;
      const maxLength = +el.getAttribute('val-min-length');
      if (maxLength < 0 || isNaN(maxLength)) {
        throw new Error('val-min-length应该为正整数');
        return true;
      }
      return len >= valid;
    },
    message: el => `长度不能少于${el.getAttribute('val-min-length')}个字符`,
  },
  'val-email': {
    validator(el) {
      return emailReg.test(el.value);
    },
    message: () => '请输入正确的邮箱',
  },
  'val-url': {
    validator(el) {
      return urlReg.test(el.value);
    },
    message: () => '请输入正确的路径',
  },
  'val-cellphone': {
    validator(el) {
      return cellphoneReg.test(el.value);
    },
    message: () => '请输入正确的手机号码',
  },
  'val-password': {
    validator(el) {
      return passwordReg.test(el.value);
    },
    message: () => '密码过于简单，必须包含字母、数字、长度在6-20位',
  },
  'val-id-card': {
    validator(el) {
      return idCardReg.test(el.value);
    },
    message: () => '身份证输入不正确',
  },
  'val-time': {
    validator(el) {
      return timeReg.test(el.value);
    },
    message: () => '不是一个正常的时间',
  },
};
