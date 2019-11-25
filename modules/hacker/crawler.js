
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
cl.queue(target);