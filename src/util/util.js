/**
 * Created by haoli on 2/24/16.
 */
/**
 * 把数组所有元素排序，并按照“参数=参数值”的模式用“&”字符拼接成字符串
 * @param params 需要排序并参与字符拼接的参数组
 * @return 拼接后字符串
 */
export function createUrl(params) {
    let keys = Object.keys(params);
    keys.sort();
    let paramvalue = '';
    for (let key of keys) {
        paramvalue = `${paramvalue}${key}=${params[key]}&`;
    }
    //去除最后一个&
    paramvalue = paramvalue.substring(0, paramvalue.length - 1);
    return paramvalue;
}