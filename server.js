const koa = require('koa');
const koaStatic = require('koa-static');
const fs = require('fs');
const path = require('path');
const crawler = require('./modules/hacker/crawler');
const crypto = require('./modules/hacker/crypto');
const app = new koa();

app.use(koaStatic(__dirname+'/www/website'));
app.use(async (ctx) => {
	if(ctx.path=="/api/getServerInfo"){
		ctx.response.status = 200;
  		ctx.body = 'Hello World';
	}
});

app.listen(8081,()=>{
	console.log("server ok");
});


let data = "Li8728428850";
let key = Buffer.alloc(32,"fuckyou");
let iv = Buffer.alloc(16,"fuckyou");

console.log("keyHex:"+key.toString('hex'));
console.log("ivHex:"+iv.toString('hex'));

let crypted = crypto.aes256Encrypt(data,key,iv);
console.log("crypted:"+crypted.toString("hex"));
let decrypted = crypto.aes256Decrypt(crypted,key,iv);
console.log("decrypted:"+decrypted);

























