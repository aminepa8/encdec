//Diffie Hellman https://datatracker.ietf.org/doc/html/rfc3526
//ECDH AND AES 256
const crypto = require('crypto');
const alice = crypto.createECDH('secp256k1');
alice.generateKeys();

const bob = crypto.createECDH('secp256k1');
bob.generateKeys();

//Public Keys
const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');
const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

//Shared Keys
const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64,'base64','hex');
const bobSharedKey = bob.computeSecret(alicePublicKeyBase64,'base64','hex');

//Comparing Shared Keys
console.log('aliceSharedKey === bobSharedKey : ',aliceSharedKey ===bobSharedKey);
console.log('Alice shared key : ',aliceSharedKey);
console.log('bob shared key : ',bobSharedKey);

const aes256 = require('aes256');

const message ="this is some random message lol";
const encrypted = aes256.encrypt(aliceSharedKey,message);
console.log('Encrypted Message : ',encrypted);

const decrypted = aes256.decrypt(bobSharedKey,encrypted);
console.log('Decrypted Message : ',decrypted);