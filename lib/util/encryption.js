'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rsaSign = rsaSign;
exports.rsaVerify = rsaVerify;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by haoli on 2/24/16.
 */
function rsaSign(prestr, key_file) {
    let pem = _fs2.default.readFileSync(key_file);
    let prikey = pem.toString('ascii');
    let signob = _crypto2.default.createSign('RSA-SHA1');
    signob.update(prestr, 'utf8');
    let signstr = signob.sign(prikey, 'base64');
    return signstr;
}

function rsaVerify(prestr, sign, key_file) {
    let publicPem = _fs2.default.readFileSync(key_file);
    let publicKey = publicPem.toString('ascii');
    console.log(publicKey);
    let verifyob = _crypto2.default.createVerify('RSA-SHA1');
    verifyob.update(prestr, 'utf8');
    let res = verifyob.verify(publicKey, sign, 'base64');
    return res;
}