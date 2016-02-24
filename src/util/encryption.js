/**
 * Created by haoli on 2/24/16.
 */
import crypto from 'crypto';
import fs from 'fs';
export function rsaSign(prestr, key_file) {
    let pem = fs.readFileSync(key_file);
    let prikey = pem.toString('ascii');
    let signob = crypto.createSign('RSA-SHA1');
    signob.update(prestr, 'utf8');
    let signstr = signob.sign(prikey, 'base64');
    return signstr;
}

export function rsaVerify(prestr, sign, key_file) {
    let publicPem = fs.readFileSync(key_file);
    let publicKey = publicPem.toString('ascii');
    console.log(publicKey);
    let verifyob = crypto.createVerify('RSA-SHA1');
    verifyob.update(prestr, 'utf8');
    let res = verifyob.verify(publicKey, sign, 'base64');
    return res;
}