"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.paraFilter = paraFilter;
exports.createLinkString = createLinkString;

var _util = require("../util/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function paraFilter(sArray) {
    if (typeof sArray == "object" && Object.prototype.toString.call(sArray).toLowerCase() == "[object object]" && !sArray.length) {
        for (let _ref in sArray) {
            var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

            let key = _ref2[0];
            let value = _ref2[1];

            if (value === null || value === undefined || value === '' || key.toLocaleLowerCase() === 'sign' || key.toLocaleLowerCase() === 'sign_type') {
                delete sArray[key];
            }
        }
    }
    return sArray;
}

/**
 * 除去数组中的空值和签名参数
 * @param sArray 签名参数组
 * @return 去掉空值与签名参数后的新签名参数组
 */
/**
 * Created by haoli on 2/24/16.
 */
/**
 * 支付宝核心工具
 */
/**
 * 除去数组中的空值和签名参数
 * @param sArray 签名参数组
 * @return 去掉空值与签名参数后的新签名参数组
 */
function createLinkString(params) {
    return (0, _util.createUrl)(params);
}