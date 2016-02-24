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
import {createUrl} from '../util/util';
export function paraFilter(sArray) {
    if (typeof(sArray) == "object" && Object.prototype.toString.call(sArray).toLowerCase() == "[object object]" && !sArray.length) {
        for (let [key,value] in sArray) {
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
export function createLinkString(params) {
    return createUrl(params);
}


