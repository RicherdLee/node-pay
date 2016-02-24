'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.createUrl = createUrl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by haoli on 2/24/16.
 */
/**
 * 把数组所有元素排序，并按照“参数=参数值”的模式用“&”字符拼接成字符串
 * @param params 需要排序并参与字符拼接的参数组
 * @return 拼接后字符串
 */
function createUrl(params) {
  let keys = (0, _keys2.default)(params);
  keys.sort();
  let paramvalue = '';
  for (let key of keys) {
    paramvalue = `${ paramvalue }${ key }=${ params[key] }&`;
  }
  //去除最后一个&
  paramvalue = paramvalue.substring(0, paramvalue.length - 1);
  return paramvalue;
}