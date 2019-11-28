
let Crawler = require('crawler');
let fs = require('fs');

class LCrawler{
	
	constructor(){
		this.cl = new Crawler();
	}

	checkImgName(type,name){

		let inCopy = name;
		// 判断图片名称是否有后缀
		if(!(inCopy.indexOf(".jpg")>-1) && !(inCopy.indexOf(".png")>-1) && !(inCopy.indexOf(".gif")>-1) && !(inCopy.indexOf(".svg")>-1) 
			&& !(inCopy.indexOf(".tif")>-1) && !(inCopy.indexOf(".bmp")>-1)){
			// 判断返回图片格式
			switch(type){
				case "image/jpeg":
					name = `${name}.jpg`;
					break;
				case "image/png":
					name = `${name}.png`;
					break;
				case "image/gif":
					name = `${name}.gif`;
					break;
				case "image/svg+xml":
					name = `${name}.svg`;
					break;
				case "image/tiff":
					name = `${name}.tif`;
					break;
				case "image/bmp":
					name = `${name}.bmp`;
					break;
			}
		}
		return name;
	}

	async crawPage(url){

		if(url){

			return await new Promise((resolve,reject)=>{

				this.cl.queue([{
					uri:url,
					callback:(e,r,d)=>{
						if(e){
							reject(`CrawPageError_${url}:${e}`);
						}
						if(r){
							resolve(r);
						}
						d();
					}
				}]);

			});
		}
	}

	/*
	 * 根据图片url抓去图片
	 */
	async crawSingleImg(url,savePath){

		if(url){

			return await new Promise((resolve,reject)=>{
				this.cl.queue([{
					uri:url,
					encoding:null,
					jQuery:false,
					callback:(e,r,d)=>{
						if(e){
							reject(`CrawPageError_${url}:${e}`);
						}
						if(r){

							let imgName = url.split("?")[0].split("/");
							imgName = imgName[imgName.length - 1];
							imgName = this.checkImgName(r.headers['content-type'],imgName);

							// 保存图片
							let sp = `${savePath}${imgName}`;
							fs.writeFile(sp,"null",'utf8',function(err){
								fs.createWriteStream(sp).write(r.body);
								d();
							});
						}
						d();
					}
				}]);
			})

		}
	}

	/*
	 * 从网页抓去所有图片
	 */
	async crawImgs(url,savePath){

		if(url){

			return await new Promise((resolve,reject)=>{
				// 先获取页面
				this.crawPage(url).then((res)=>{

					let imgs = res.$("img");
					let imgSrcs = [];
					let uris = [];

					imgs.map((index,item)=>{

						// 下载图片
						let uri = res.$(item).attr("src");
						if(uri.indexOf("http")==-1&&uri.indexOf("//")>-1){
							uri = "http:"+uri;
						}

						uris.push({
							uri:uri,
							encoding:null,
							jQuery:false,
							callback:(e,r,d)=>{
								if(e){
									console.error(`DownloadImgError_${uri}:${r}`);
								}
								if(r){

									let imgName = uri.split("?")[0].split("/");
									imgName = imgName[imgName.length - 1];
									imgName = this.checkImgName(r.headers['content-type'],imgName);

									// 保存图片
									let sp = `${savePath}${imgName}`;
									fs.writeFile(sp,"null",'utf8',function(err){
										fs.createWriteStream(sp).write(r.body);
										d();
									});
								}
							}
						});
						imgSrcs.push(uri);
					});
					console.table(imgSrcs);
					this.cl.queue(uris);

				}).catch((err)=>{
					reject(err);
				})
			});

		}
	}


}

const instance = new LCrawler();
Object.freeze(instance);
module.exports = instance;

