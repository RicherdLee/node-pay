/**
 * Created by haoli on 2/24/16.
 */
const ALIPAY_GATEWAY_NEW = 'https://mapi.alipay.com/gateway.do?'
import {createLinkString,paraFilter} from './aliCore';
import {rsaSign,rsaVerify} from '../util/encryption';
import {AliConfig} from './aliConfig';
/**
 * 生成签名结果
 * @param sPara 要签名的数组
 * @return 签名结果字符串
 */
export function buildRequestMysign(sPara) {
    let prestr = createLinkString(sPara);
    let mysign = '';
    if (AliConfig.sign_type.toLocaleLowerCase() === 'rsa') {
        mysign = rsaSign(prestr, AliConfig.private_key_path, AliConfig.input_charset)
    }
    return mysign;
}

/**
 * 生成要请求给支付宝的参数数组
 * @param sParaTemp 请求前的参数数组
 * @return 要请求的参数数组
 */
export function buildRequestPara(sParaTemp) {
    let sPara = paraFilter(sParaTemp);
    sPara.sign = buildRequestMysign(sPara);
    sPara.sign_type = AliConfig.sign_type;
    return sPara;
}


/**
 * 建立请求，以表单HTML形式构造（默认）
 * @param sParaTemp 请求参数数组
 * @param strMethod 提交方式。两个值可选：post、get
 * @param strButtonName 确认按钮显示文字
 * @return 提交表单HTML文本
 */
export function buildRequest(sParamap, method, strButtonName) {
    let map = bulidRequestPara(sParamap);
    let sbHtml = `<form id="alipaysubmit" name="alipaysubmit" action="${ALIPAY_GATEWAY_NEW}_input_charset=${AliConfig.input_charset}" method="${method}">`;
    for (let k in map) {
        sbHtml = `${sbHtml} <input type="hidden" name="${k}" value="${map[k]}" />`;
    }
    sbHtml = `${sbHtml} <input tpye="submit" value="${strButtonName}" style="display:none" />`;
    sbHtml = `${sbHtml} <script>document.forms['alipaysubmit'].submit();</script>`;
    return sbHtml;
}