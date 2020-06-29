
const fs = require('fs');
const crypto = require('crypto');

class LCrypto {

	// 返回随机生成的16字节的16进制数
	async getRandomHex(byteNum){
		return await new Promise((resolve,reject) => {
			crypto.randomBytes(byteNum, (err, buf) => {
		  		if(err){
		  			reject(err);
		  		}
		  		if(buf){
		  			resolve(buf.toString('hex'));
		  		}
			});
		});
	}

	// 返回随机生成的16字节数据
	async getRandomBytes(byteNum){
		return await new Promise((resolve,reject) => {
			crypto.randomBytes(byteNum, (err, buf) => {
		  		if(err){
		  			reject(err);
		  		}
		  		if(buf){
		  			resolve(buf);
		  		}
			});
		});
	}

	// 返回16进制字符串
	hashEncrypt(algo,data){
		let crypted = crypto.createHash(algo);
		return crypted.update(data).digest('hex');
	}

	// 返回16进制字符串
	aesEncrypt(algo,data,key,iv){
		const cipher = crypto.createCipheriv(algo,key,iv);
	    let crypted = cipher.update(data, 'utf8', 'hex');
	    crypted += cipher.final('hex');
	    return crypted;
	}

	// 返回普通字符串
	aesDecrypt(algo,data,key,iv){
		const decipher = crypto.createDecipheriv(algo,key,iv);
	    let decrypted = decipher.update(data, 'hex', 'utf8');
	    decrypted += decipher.final('utf8');
	    return decrypted;
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

	/**
	 * aes加密统一使用CBC模式
	 */
	// 返回16进制的aes128对称加密密文
	aes128Encrypt(data,key,iv) {
	    return this.aesEncrypt("aes-128-cbc",data,key,iv);
	}

	// 返回aes128对称加密的明文
	aes128Decrypt(data,key,iv){
		return this.aesDecrypt("aes-128-cbc",data,key,iv);
	}

	// 返回16进制的aes192对称加密密文
	aes192Encrypt(data,key,iv) {
	   return this.aesEncrypt("aes-192-cbc",data,key,iv);
	}

	// 返回aes192对称加密的明文
	aes192Decrypt(data,key,iv){
		return this.aesDecrypt("aes-192-cbc",data,key,iv);
	}

	// 返回16进制的aes256对称加密密文
	aes256Encrypt(data,key,iv) {
	    return this.aesEncrypt("aes-256-cbc",data,key,iv);
	}

	// 返回aes256对称加密的明文
	aes256Decrypt(data,key,iv){
		return this.aesDecrypt("aes-256-cbc",data,key,iv);
	}

	// 生成rsa非对称加密秘钥，普通字符串
	async getRsaKeys(){
		return await new Promise((resolve,reject) => {
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

	// 返回rsa非对称私钥加密密文，16进制字符串
	rsaPriEncrypt(data,privateKey){
		let encrypted = crypto.privateEncrypt(privateKey,Buffer.from(data,'utf8'));
		return encrypted.toString('hex');
	}

	// 返回rsa非对称公钥解密后的明文，普通字符串
	rsaPubDecrypt(data,publicKey){
		let decrypted = crypto.publicDecrypt(publicKey,Buffer.from(data,'hex'));
		return decrypted.toString('utf8');
	}

	// 返回rsa非对称私钥加密密文，16进制字符串
	rsaPubEncrypt(data,publicKey){
		let encrypted = crypto.publicEncrypt(publicKey,Buffer.from(data,'utf8'));
		return encrypted.toString('hex');
	}

	// 返回rsa非对称私钥解密后的明文，普通字符串
	rsaPriDecrypt(data,privateKey){
		let decrypted = crypto.privateDecrypt(privateKey,Buffer.from(data,'hex'));
		return decrypted.toString('utf8');
	}

	// 保存秘钥文件
	saveKeys(privateKey,publicKey){
		let priPath = `${__dirname}/../keys/private.pem`;
		let pubPath = `${__dirname}/../keys/public.pem`;
		fs.writeFile(priPath,privateKey,'utf8',(err) => {});
		fs.writeFile(pubPath,publicKey,'utf8',(err) => {});
	}
	
}

const instance = new LCrypto();
Object.freeze(instance);
module.exports = instance;

