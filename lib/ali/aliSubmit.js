'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildRequestMysign = buildRequestMysign;
exports.buildRequestPara = buildRequestPara;
exports.buildRequest = buildRequest;

var _aliCore = require('./aliCore');

var _encryption = require('../util/encryption');

var _aliConfig = require('./aliConfig');

/**
 * Created by haoli on 2/24/16.
 */
const ALIPAY_GATEWAY_NEW = 'https://mapi.alipay.com/gateway.do?';

/**
 * 生成签名结果
 * @param sPara 要签名的数组
 * @return 签名结果字符串
 */
function buildRequestMysign(sPara) {
    let prestr = (0, _aliCore.createLinkString)(sPara);
    let mysign = '';
    if (_aliConfig.AliConfig.sign_type.toLocaleLowerCase() === 'rsa') {
        mysign = (0, _encryption.rsaSign)(prestr, _aliConfig.AliConfig.private_key_path, _aliConfig.AliConfig.input_charset);
    }
    return mysign;
}

/**
 * 生成要请求给支付宝的参数数组
 * @param sParaTemp 请求前的参数数组
 * @return 要请求的参数数组
 */
function buildRequestPara(sParaTemp) {
    let sPara = (0, _aliCore.paraFilter)(sParaTemp);
    sPara.sign = buildRequestMysign(sPara);
    sPara.sign_type = _aliConfig.AliConfig.sign_type;
    return sPara;
}

/**
 * 建立请求，以表单HTML形式构造（默认）
 * @param sParaTemp 请求参数数组
 * @param strMethod 提交方式。两个值可选：post、get
 * @param strButtonName 确认按钮显示文字
 * @return 提交表单HTML文本
 */
function buildRequest(sParamap, method, strButtonName) {
    let map = bulidRequestPara(sParamap);
    let sbHtml = `<form id="alipaysubmit" name="alipaysubmit" action="${ ALIPAY_GATEWAY_NEW }_input_charset=${ _aliConfig.AliConfig.input_charset }" method="${ method }">`;
    for (let k in map) {
        sbHtml = `${ sbHtml } <input type="hidden" name="${ k }" value="${ map[k] }" />`;
    }
    sbHtml = `${ sbHtml } <input tpye="submit" value="${ strButtonName }" style="display:none" />`;
    sbHtml = `${ sbHtml } <script>document.forms['alipaysubmit'].submit();</script>`;
    return sbHtml;
}