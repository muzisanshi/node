
const Mime = require('mime/Mime');
const mime = new Mime({
	'text/cache-manifest':['manifest','appcache']
});

const http2 = require('http2');
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


// app.use(koaStatic('/Users/mac/Documents/tools/dist'));
// app.use(koaStatic(__dirname+'/www/dist'));
// app.use(koaStatic('/Users/mac/Documents/HASHREAL/hashreal.front/h5'));
// app.use(koaStatic('/Users/mac/Documents/HASHREAL/hashreal.front/pc'));
// app.use(koaStatic('/Users/mac/Documents/eface-board/pc/dist'));
// app.use(koaStatic('/Users/mac/Documents/cloud-platform-eface.web/org/dist'));
app.use(koaStatic('/Users/mac/Documents/node/www/website'));
// app.use(koaStatic('/Users/mac/Documents/daocheng/dist'));

// app.use(async (ctx) => {
// 	console.log(`----ctx.path----${ctx.path}`)
// });

const port = 8089;
app.listen(port,()=>{
	console.log("server ok,running at " + port);
});

// const server = http2.createSecureServer({
//   cert: fs.readFileSync('./ssl/cert.pem'),
//   key: fs.readFileSync('./ssl/key.pem')
// }, app.callback())

// const server = http2.createServer(app.callback());
// server.listen(port, () => {
//   console.log(`server ok,running at ${port}`)
// })

// const ddos = new Ddos();
// ddos.start();
// reqs();

























