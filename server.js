
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');

//   // ES6实验

//   // 实验结束

//   res.end(JSON.stringify(headers));
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// let express = require('express');
// let ejs = require('ejs');
// let mg = require('mongoose');
// let {Schema} = mg;
// let app = express();

// // 配置网站静态资源
// app.use(express.static('./website'));

// // 允许跨域请求
// app.all("*",(req,res,next)=>{
// 	res.header("Access-Control-Allow-Origin","*");
// 	res.header("Access-Control-Allow-Headers","*");
// 	res.header("Access-Control-Allow-Methods","*");
// 	next();
// });

// // 拦截请求
// app.post("/api/getServerInfo",(req,res,next)=>{
// 	// res.end('node express');
// 	// res.setHeader()
// 	let hstr = `<h1><%=info.name%></h1>`;
// 	let tmpl = ejs.compile(hstr);
// 	res.setHeader("Content-Type","text/html");
// 	res.end(tmpl({info:{name:"lilei"}}));
// 	next();
// });

// app.listen(8080,"127.0.0.1", () => {
//   console.log('express running on http://127.0.0.1:8080');
// });

let koa = require('koa');
let koaStatic = require('koa-static');
let fs = require('fs');
let path = require('path');
let app = new koa();

app.use(koaStatic(__dirname+'/website'));
app.use(async (ctx) => {
	console.log(ctx.path);
	if(ctx.path=="/api/getServerInfo"){
		ctx.response.status = 200;
  		ctx.body = 'Hello World';
	}
});
app.listen(8080,()=>{
	console.log("server ok");

	// async异步操作
	let timeout = async function(){
		await new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve("fuck");
			}, 5000);
		});
		
		// console.log("fuck")
	};
	let p = timeout();
	p.then((r)=>{
		console.log(r);
	})

});

// 网络爬虫
let Crawler = require('crawler');
let cl = new Crawler({
	callback:(err,res,done)=>{
		let imgs = res.$("img");
		let imgSrcs = [];
		let as = res.$("a");
		let uris = [];
		let saveRoot = "./website/image/jd/";

		imgs.map((index,item)=>{
			// 下载图片
			let uri = res.$(item).attr("src");
			let imgName = uri.split("/");
			imgName = imgName[imgName.length - 1];

			if(uri.indexOf("http")==-1&&uri.indexOf("//")>-1){
				uri = "http:"+uri;
			}

			uris.push({
				uri:uri,
				encoding:null,
				jQuery:false,
				callback:(e,r,d)=>{
					// 先创建文件
					fs.writeFile(saveRoot+imgName,"null",'utf8',function(err){
						fs.createWriteStream(saveRoot+imgName).write(r.body);
						d();
					});
				}
			});
			imgSrcs.push(uri);
		});
		fs.writeFile(saveRoot+"urls.json",JSON.stringify(imgSrcs),'utf8',function(err){});
		cl.queue(uris);
		done();
	}
});
let target = "https://www.youku.com/";
// cl.queue(target);



























