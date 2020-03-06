const koa = require('koa');
const koaStatic = require('koa-static');
const fs = require('fs');
const path = require('path');
//const crawler = require('./modules/hacker/crawler');
// const {SocketManager} = require('./modules/hacker/utils');
const crypto = require('./modules/hacker/crypto');
const app = new koa();


app.use(koaStatic(__dirname+'/www/dist'));
// app.use(koaStatic('/Users/mac/Documents/HASHREAL/hashreal.front/h5'));
// app.use(koaStatic('/Users/mac/Documents/HASHREAL/hashreal.front/pc'));
app.use(async (ctx) => {
	if(ctx.path=="/api/getServerInfo"){
		ctx.response.status = 200;
  		ctx.body = 'Hello World';
	}
});

let port = 8089;
app.listen(port,()=>{
	console.log("server ok,running at " + port);
});


























