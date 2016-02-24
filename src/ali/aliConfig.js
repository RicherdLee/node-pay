/**
 * Created by haoli on 2/24/16.
 */
/**
 * 支付宝配置
 */
export let AliConfig = {
    //合作身份者ID，以2088开头由16位纯数字组成的字符串
    partner: '',
    // 商户的私钥
    private_key_path: '',
    // 支付宝公钥
    ali_public_key_path: '',
    //编码格式
    input_charset: 'utf-8',
    //加密方式
    sign_type: 'RSA',
    //通知地址
    notify_url: '',
    //web支付通知地址
    notify_web_url: '',
    //wap支付通知地址
    notify_wap_url: ''
}