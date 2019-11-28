
const fs = require('fs');
const crypto = require('crypto');

class LCrypto {

	// 返回随机生成的16进制数
	async getRandomHex(){
		return await new Promise((resolve,reject)=>{
			crypto.randomBytes(16, (err, buf) => {
		  		if(err){
		  			reject(err)
		  		}
		  		if(buf){
		  			resolve(buf.toString('hex'));
		  		}
			});
		});
	}

	hashEncrypt(algo,data){
		let crypted = crypto.createHash(algo);
		return crypted.update(data).digest('hex');
	}

	// 返回16进制的md5密文
	md5Encrypt(data){
		return this.hashEncrypt('md5',data);
	}

	// 返回16进制的sha1密文
	sha1Encrypt(data){
		return this.hashEncrypt('sha1',data);
	}

	// 返回16进制的sha224密文
	sha224Encrypt(data){
		return this.hashEncrypt('sha224',data);
	}

	// 返回16进制的sha256密文
	sha256Encrypt(data){
		return this.hashEncrypt('sha256',data);
	}

	// 返回16进制的sha384密文
	sha384Encrypt(data){
		return this.hashEncrypt('sha384',data);
	}

	// 返回16进制的sha512密文
	sha512Encrypt(data){
		return this.hashEncrypt('sha512',data);
	}

	// 返回16进制的aes192对称加密密文
	aesEncrypt(data,key) {
	    const cipher = crypto.createCipher('aes192', key);
	    let crypted = cipher.update(data, 'utf8', 'hex');
	    crypted += cipher.final('hex');
	    return crypted;
	}

	// 返回aes192对称加密的明文
	aesDecrypt(data,key){
		const decipher = crypto.createDecipher('aes192', key);
	    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	    decrypted += decipher.final('utf8');
	    return decrypted;
	}

	// 生成rsa非对称加密秘钥
	async getRsaKeys(){
		return await new Promise((resolve,reject)=>{
			crypto.generateKeyPair('rsa', {
				modulusLength: 1024,
				publicKeyEncoding: {
				    type: 'spki',
				    format: 'pem'
				},
				privateKeyEncoding: {
				    type: 'pkcs8',
				    format: 'pem'
				}
			}, (err, publicKey, privateKey) => {
			  	if(err){
			  		reject(err);
			  	}
			  	if(publicKey){
			  		resolve({
			  			publicKey,
			  			privateKey
			  		})
			  	}
			});
		});
	}

	// 返回rsa非对称私钥加密密文
	rsaPriEncrypt(data,privateKey){
		let encrypted = crypto.privateEncrypt(privateKey,Buffer.from(data,'utf8'));
		return encrypted.toString('hex');
	}

	// 返回rsa非对称公钥解密后的明文
	rsaPubDecrypt(data,publicKey){
		let decrypted = crypto.publicDecrypt(publicKey,Buffer.from(data,'hex'));
		return decrypted.toString('utf8');
	}

	// 返回rsa非对称私钥加密密文
	rsaPubEncrypt(data,publicKey){
		let encrypted = crypto.publicEncrypt(publicKey,Buffer.from(data,'utf8'));
		return encrypted.toString('hex');
	}

	// 返回rsa非对称私钥解密后的明文
	rsaPriDecrypt(data,privateKey){
		let decrypted = crypto.privateDecrypt(privateKey,Buffer.from(data,'hex'));
		return decrypted.toString('utf8');
	}

	// 保存秘钥文件
	saveKeys(privateKey,publicKey){
		let priPath = `${__dirname}/../keys/private.pem`;
		let pubPath = `${__dirname}/../keys/public.pem`;
		fs.writeFile(priPath,privateKey,'utf8',(err)=>{});
		fs.writeFile(pubPath,publicKey,'utf8',(err)=>{});
	}

}

const instance = new LCrypto();
Object.freeze(instance);
module.exports = instance;

