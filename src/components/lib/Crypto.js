import * as CryptoJS from 'crypto-js';

const key = "djhfi4334jfdo8sd9jefh9h34hi4843h49349";
export const encryptAES = (text) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decryptAES = (encryptedBase64) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
  if (decrypted) {
    try {
      const str = decrypted.toString(CryptoJS.enc.Utf8);
      if (str.length > 0) {
        return str;
      } else {
        return 'error 1';
      }
    } catch (error) {
      return 'error 2';
    }
  }
  return 'error 3';
};