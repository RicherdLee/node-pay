'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verify = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _aliConfig = require('./aliConfig');

var _aliCore = require('./aliCore');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _encryption = require('../util/encryption');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by haoli on 2/24/16.
 */
const HTTPS_VERIFY_URL = "https://mapi.alipay.com/gateway.do?service=notify_verify&";

/**
 * 验证消息是否是支付宝发出的合法消息
 * @param params 通知返回来的参数数组
 * @return 验证结果
 */

let verify = exports.verify = function () {
    var ref = (0, _asyncToGenerator3.default)(function* (params) {
        if (params == null) return false;
        //判断responsetTxt是否为true，isSign是否为true
        //responsetTxt的结果不是true，与服务器设置问题、合作身份者ID、notify_id一分钟失效有关
        //isSign不是true，与安全校验码、请求时的参数格式（如：带自定义参数等）、编码格式有关
        let responseTxt = 'false';
        let notify_id = params.notify_id;
        if (notify_id != null) responseTxt = yield verifyResponse(notify_id);
        let sign = '';
        if (params.sign != null) sign = params.sign;
        let isSign = getSignVeryfy(params, sign);
        if (isSign) {
            return true;
        } else {
            return false;
        }
    });
    return function verify(_x) {
        return ref.apply(this, arguments);
    };
}();
/**
 * 获取远程服务器ATN结果,验证返回URL
 * @param notify_id 通知校验ID
 * @return 服务器ATN结果
 * 验证结果集：
 * invalid命令参数不对 出现这个错误，请检测返回处理中partner和key是否为空
 * true 返回正确信息
 * false 请检查防火墙或者是服务器阻止端口问题以及验证时间是否超过一分钟
 */


let verifyResponse = function () {
    var ref = (0, _asyncToGenerator3.default)(function* (notify_id) {
        //获取远程服务器ATN结果，验证是否是支付宝服务器发来的请求
        return yield checkUrl(`${ HTTPS_VERIFY_URL }partner=${ _aliConfig.AliConfig.partner }&notify_id=${ notify_id }`);
    });
    return function verifyResponse(_x2) {
        return ref.apply(this, arguments);
    };
}();

function getSignVeryfy(Params, sign) {
    //过滤空值、sign与sign_type参数
    let sParaNew = (0, _aliCore.paraFilter)(Params);
    //获取待签名字符串
    let preSignStr = (0, _aliCore.createLinkString)(sParaNew);
    //获得签名验证结果
    let isSign = false;
    if (_aliConfig.AliConfig.sign_type.toUpperCase() === 'RSA') {
        isSign = (0, _encryption.rsaVerify)(preSignStr, sign, _aliConfig.AliConfig.ali_public_key_path, 'utf-8');
    }
    return isSign;
}
/**
 * 获取远程服务器ATN结果
 * @param urlvalue 指定URL路径地址
 * @return 服务器ATN结果
 * 验证结果集：
 * invalid命令参数不对 出现这个错误，请检测返回处理中partner和key是否为空
 * true 返回正确信息
 * false 请检查防火墙或者是服务器阻止端口问题以及验证时间是否超过一分钟
 */

let checkUrl = function () {
    var ref = (0, _asyncToGenerator3.default)(function* (urlvalue) {
        let inputLine = yield (0, _requestPromise2.default)({ uri: urlvalue, method: 'get' });
        return inputLine;
    });
    return function checkUrl(_x3) {
        return ref.apply(this, arguments);
    };
}();