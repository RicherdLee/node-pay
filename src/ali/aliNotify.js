/**
 * Created by haoli on 2/24/16.
 */
const HTTPS_VERIFY_URL = "https://mapi.alipay.com/gateway.do?service=notify_verify&";
import {AliConfig} from './aliConfig';
import {paraFilter,createLinkString} from './aliCore';
import rp from 'request-promise';
import {rsaVerify} from '../util/encryption'
/**
 * 验证消息是否是支付宝发出的合法消息
 * @param params 通知返回来的参数数组
 * @return 验证结果
 */
export async function verify(params) {
    if (params == null) return false;
    //判断responsetTxt是否为true，isSign是否为true
    //responsetTxt的结果不是true，与服务器设置问题、合作身份者ID、notify_id一分钟失效有关
    //isSign不是true，与安全校验码、请求时的参数格式（如：带自定义参数等）、编码格式有关
    let responseTxt = 'false';
    let notify_id = params.notify_id;
    if (notify_id != null) responseTxt = await verifyResponse(notify_id);
    let sign = '';
    if (params.sign != null) sign = params.sign;
    let isSign = getSignVeryfy(params, sign);
    if (isSign ) {
        return true;
    } else {
        return false;
    }
}
/**
 * 获取远程服务器ATN结果,验证返回URL
 * @param notify_id 通知校验ID
 * @return 服务器ATN结果
 * 验证结果集：
 * invalid命令参数不对 出现这个错误，请检测返回处理中partner和key是否为空
 * true 返回正确信息
 * false 请检查防火墙或者是服务器阻止端口问题以及验证时间是否超过一分钟
 */
async function verifyResponse(notify_id) {
    //获取远程服务器ATN结果，验证是否是支付宝服务器发来的请求
    return await checkUrl(`${HTTPS_VERIFY_URL}partner=${AliConfig.partner}&notify_id=${notify_id}`);
}

function getSignVeryfy(Params, sign) {
//过滤空值、sign与sign_type参数
    let sParaNew = paraFilter(Params);
    //获取待签名字符串
    let preSignStr = createLinkString(sParaNew);
    //获得签名验证结果
    let isSign = false;
    if (AliConfig.sign_type.toUpperCase() === 'RSA') {
        isSign = rsaVerify(preSignStr, sign, AliConfig.ali_public_key_path, 'utf-8');
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
async function checkUrl(urlvalue) {
    let inputLine = await rp({uri: urlvalue, method: 'get'});
    return inputLine;
}
