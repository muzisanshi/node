const koa = require('koa');
const koaStatic = require('koa-static');
const fs = require('fs');
const path = require('path');
//const crawler = require('./modules/hacker/crawler');
const crypto = require('./modules/hacker/crypto');
const app = new koa();

// app.use(koaStatic(__dirname+'/www/website'));
app.use(koaStatic('/Users/mac/Documents/HASHREAL/hashreal.front/h5'));
// app.use(koaStatic('/Users/mac/Documents/HASHREAL/hashreal.front/pc'));
app.use(async (ctx) => {
	if(ctx.path=="/api/getServerInfo"){
		ctx.response.status = 200;
  		ctx.body = 'Hello World';
	}
});

app.listen(8081,()=>{
	console.log("server ok");
});

























