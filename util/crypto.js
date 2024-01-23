const  CryptoJS = require("crypto-js")

const keyChain = process.env.CRYPTO_KEYCHAIN || '';
const ivChain = process.env.CRYPTO_IVCHAIN || '';
const key = CryptoJS.enc.Hex.parse(keyChain);
const iv = CryptoJS.enc.Hex.parse(ivChain);

const encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv });
  return encrypted.toString();
}

const decrypt = (data) => {
  const decrypted = CryptoJS.AES.decrypt(data, key, { iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };
