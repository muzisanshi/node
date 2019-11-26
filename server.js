let koa = require('koa');
let koaStatic = require('koa-static');
let fs = require('fs');
let path = require('path');
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



























