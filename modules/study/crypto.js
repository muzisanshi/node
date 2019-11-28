
const crypto = require('crypto');

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    let hex = cipher.final('hex');
    console.log("hex data:"+hex);
    crypted += hex;
	console.log("crypted data:"+crypted);
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

// console.log('Plain text: ' + data);
// console.log('Encrypted text: ' + encrypted);
// console.log('Decrypted text: ' + decrypted);

// const data = "Li8728428850";
// let pubkey,prikey = "";


// crypto.generateKeyPair('rsa', {
//   modulusLength: 1024,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem'
//   }
// }, (err, publicKey, privateKey) => {
//   pubkey = publicKey;
//   prikey = privateKey;

//   let encrypted = crypto.publicEncrypt(pubkey,Buffer.from(data,'utf8'));
//   console.log(encrypted.toString('hex'));
//   let decrypted = crypto.privateDecrypt(prikey,encrypted);
//   console.log(decrypted.toString('utf8'))
// });

// let encrypted = crypto.privateEncrypt(prikey,Buffer.from(data,'utf8'));
// console.log("private encrypted data:"+encrypted.toString('hex'));
// rsa.update(data);
// console.log(rsa.final('utf8'));











