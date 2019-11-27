let koa = require('koa');
let koaStatic = require('koa-static');
let fs = require('fs');
let path = require('path');
let crawler = require('./modules/hacker/crawler');
let app = new koa();

app.use(koaStatic(__dirname+'/www/website'));
app.use(async (ctx) => {
	if(ctx.path=="/api/getServerInfo"){
		ctx.response.status = 200;
  		ctx.body = 'Hello World';
	}
});
app.listen(8080,()=>{
	console.log("server ok");
	
});

let url = "http://www.youku.com";
// let url = "https://ykimg.alicdn.com/develop/image/2019-11-21/b90fa5a923d8093759b23d7aeead52f5.png";
// let url = "http://r1.ykimg.com/050C00005CC2941B859B5E3AFC07E8F6?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80/sharpen,100"
crawler.crawImgs(url,`${__dirname}/www/static/`);
// crawler.crawSingleImg(url,`${__dirname}/www/static/`);



























